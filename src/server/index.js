import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { connectDb } from './db.js';
import User from './models/User.js';
import Appointment from './models/Appointment.js';
import Cut from './models/Cut.js';
import ObserveStyle from './models/ObserveStyle.js';
import { recommendObserveStyle } from './observe-ai.js';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const COOKIE_NAME = 'native_session';
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be at least 32 random characters.');

app.disable('x-powered-by');
app.use(express.json({ limit: '12mb' }));
app.use((req,res,next)=>{res.setHeader('Access-Control-Allow-Origin',CLIENT_ORIGIN);res.setHeader('Access-Control-Allow-Credentials','true');res.setHeader('Access-Control-Allow-Headers','Content-Type');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');if(req.method==='OPTIONS')return res.sendStatus(204);if(['POST','PUT','PATCH','DELETE'].includes(req.method)&&req.get('origin')!==CLIENT_ORIGIN)return res.status(403).json({message:'Request origin rejected.'});next()});

const cookies=(header='')=>Object.fromEntries(header.split(';').map(part=>part.trim().split('=').map(decodeURIComponent)).filter(([key])=>key));
const publicUser=user=>({id:user._id,name:user.name,email:user.email,role:user.role});
const issueSession=(res,user)=>{const token=jwt.sign({sub:String(user._id),role:user.role},process.env.JWT_SECRET,{expiresIn:'2h',issuer:'native-cuts',audience:'native-cuts-web'});res.cookie(COOKIE_NAME,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:7200000})};
const requireAuth=async(req,res,next)=>{try{const token=cookies(req.headers.cookie)[COOKIE_NAME];const payload=jwt.verify(token,process.env.JWT_SECRET,{issuer:'native-cuts',audience:'native-cuts-web'});const user=await User.findById(payload.sub);if(!user)return res.status(401).json({message:'Session expired.'});req.user=user;next()}catch{return res.status(401).json({message:'Authentication required.'})}};
const requireAdmin=(req,res,next)=>req.user.role==='admin'?next():res.status(403).json({message:'Administrator access required.'});
const attempts=new Map();
const authLimit=(req,res,next)=>{const now=Date.now();const key=req.ip;const current=attempts.get(key)||{count:0,reset:now+15*60*1000};if(now>current.reset){current.count=0;current.reset=now+15*60*1000}current.count+=1;attempts.set(key,current);if(current.count>20)return res.status(429).json({message:'Too many attempts. Try again later.'});next()};

app.post('/api/auth/register',authLimit,async(req,res)=>{const name=String(req.body.name||'').trim().slice(0,80);const email=String(req.body.email||'').trim().toLowerCase();const password=String(req.body.password||'');if(name.length<2||!/^\S+@\S+\.\S+$/.test(email)||password.length<10)return res.status(400).json({message:'Use a valid name, email, and a password of at least 10 characters.'});if(await User.exists({email}))return res.status(409).json({message:'An account already exists for this email.'});const user=await User.create({name,email,password,role:'user'});issueSession(res,user);res.status(201).json({user:publicUser(user)})});
app.post('/api/auth/login',authLimit,async(req,res)=>{const email=String(req.body.email||'').trim().toLowerCase();const password=String(req.body.password||'');const user=await User.findOne({email}).select('+password');if(!user||!(await user.matchPassword(password)))return res.status(401).json({message:'Invalid email or password.'});issueSession(res,user);res.json({user:publicUser(user)})});
app.get('/api/auth/me',requireAuth,(req,res)=>res.json({user:publicUser(req.user)}));
app.post('/api/auth/logout',requireAuth,(_req,res)=>{res.clearCookie(COOKIE_NAME,{path:'/',sameSite:'strict'});res.sendStatus(204)});
app.get('/api/admin/access',requireAuth,(req,res)=>req.user.role==='admin'?res.json({allowed:true}):res.status(403).json({message:'Administrator access required.'}));
app.get('/api/appointments',requireAuth,async(req,res)=>res.json({appointments:await Appointment.find({user:req.user._id}).sort({createdAt:-1}).lean()}));
app.post('/api/appointments',requireAuth,async(req,res)=>{const service=String(req.body.service||'');const date=String(req.body.date||'');const time=String(req.body.time||'');const notes=String(req.body.notes||'').trim().slice(0,500);if(!['Hair cut','Beard trim','Line-up','Hair treatment'].includes(service)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time))return res.status(400).json({message:'Choose a valid service, date and time.'});if(new Date(`${date}T${time}`)<=new Date())return res.status(400).json({message:'Appointment time must be in the future.'});const appointment=await Appointment.create({user:req.user._id,service,date,time,notes});res.status(201).json({appointment})});
app.get('/api/cuts',requireAuth,async(req,res)=>res.json({cuts:await Cut.find({user:req.user._id}).sort({cutDate:-1}).limit(12).lean()}));
app.get('/api/observe/styles',async(req,res)=>{const mood=String(req.query.mood||'');const query={active:true};if(['Calm','Burti','Rough'].includes(mood))query.mood=mood;const styles=await ObserveStyle.find(query).select('name mood description image active').sort({mood:1,createdAt:-1}).lean();res.json({styles})});

const observeAttempts=new Map();
const observeLimit=(req,res,next)=>{const now=Date.now();const key=req.ip;const current=observeAttempts.get(key)||{count:0,reset:now+15*60*1000};if(now>current.reset){current.count=0;current.reset=now+15*60*1000}current.count+=1;observeAttempts.set(key,current);if(current.count>8)return res.status(429).json({message:'Observe needs a short rest. Try again in a few minutes.'});next()};
const isPhoto=value=>typeof value==='string'&&/^data:image\/(jpeg|jpg|png|webp);base64,/.test(value)&&value.length<=3_000_000;
app.post('/api/observe/recommend',observeLimit,async(req,res,next)=>{try{const mood=String(req.body.mood||'');const photos=req.body.photos;if(!['Calm','Burti','Rough'].includes(mood)||!Array.isArray(photos)||photos.length!==3||!photos.every(isPhoto))return res.status(400).json({message:'Observe needs three valid front, side and back images.'});const styles=await ObserveStyle.find({mood,active:true}).select('name mood description image').lean();if(!styles.length)return res.status(409).json({message:`Native has not added any ${mood} styles yet.`});const result=await recommendObserveStyle({photos,mood,styles});if(result.status==='retake')return res.json({status:'retake',confidence:result.confidence,message:result.retakeMessage||'Please retake the three views with your hair clearly visible.'});res.json({status:'recommended',confidence:result.confidence,reason:result.reason,style:{id:result.style._id,name:result.style.name,mood:result.style.mood,description:result.style.description,image:result.style.image}})}catch(error){next(error)}});

app.get('/api/admin/observe/styles',requireAuth,requireAdmin,async(_req,res)=>res.json({styles:await ObserveStyle.find().select('name mood description image active createdAt').sort({mood:1,createdAt:-1}).lean()}));
app.post('/api/admin/observe/styles',requireAuth,requireAdmin,async(req,res,next)=>{try{const name=String(req.body.name||'').trim();const mood=String(req.body.mood||'');const description=String(req.body.description||'').trim();const image=req.body.image;if(name.length<2||name.length>80||!['Calm','Burti','Rough'].includes(mood)||description.length<10||description.length>500||!isPhoto(image))return res.status(400).json({message:'Add a name, mood, useful description and a valid hairstyle image.'});if(await ObserveStyle.countDocuments({mood})>=10)return res.status(409).json({message:`${mood} already has the maximum of 10 styles.`});const style=await ObserveStyle.create({name,mood,description,image,createdBy:req.user._id});res.status(201).json({style})}catch(error){next(error)}});
app.patch('/api/admin/observe/styles/:id',requireAuth,requireAdmin,async(req,res,next)=>{try{if(typeof req.body.active!=='boolean')return res.status(400).json({message:'Active must be true or false.'});const style=await ObserveStyle.findByIdAndUpdate(req.params.id,{active:req.body.active},{new:true}).select('name mood description image active');if(!style)return res.status(404).json({message:'Observe style not found.'});res.json({style})}catch(error){next(error)}});
app.delete('/api/admin/observe/styles/:id',requireAuth,requireAdmin,async(req,res,next)=>{try{const style=await ObserveStyle.findByIdAndDelete(req.params.id);if(!style)return res.status(404).json({message:'Observe style not found.'});res.sendStatus(204)}catch(error){next(error)}});
app.use((err,_req,res,_next)=>{console.error(err);res.status(err.status||500).json({message:err.status?err.message:'Request could not be completed.'})});

await connectDb();
app.listen(PORT,()=>console.log(`Native Cuts API listening on ${PORT}`));
