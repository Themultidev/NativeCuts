import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { connectDb } from './db.js';
import User from './models/User.js';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const COOKIE_NAME = 'native_session';
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be at least 32 random characters.');

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use((req,res,next)=>{res.setHeader('Access-Control-Allow-Origin',CLIENT_ORIGIN);res.setHeader('Access-Control-Allow-Credentials','true');res.setHeader('Access-Control-Allow-Headers','Content-Type');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');if(req.method==='OPTIONS')return res.sendStatus(204);if(['POST','PUT','PATCH','DELETE'].includes(req.method)&&req.get('origin')!==CLIENT_ORIGIN)return res.status(403).json({message:'Request origin rejected.'});next()});

const cookies=(header='')=>Object.fromEntries(header.split(';').map(part=>part.trim().split('=').map(decodeURIComponent)).filter(([key])=>key));
const publicUser=user=>({id:user._id,name:user.name,email:user.email,role:user.role});
const issueSession=(res,user)=>{const token=jwt.sign({sub:String(user._id),role:user.role},process.env.JWT_SECRET,{expiresIn:'2h',issuer:'native-cuts',audience:'native-cuts-web'});res.cookie(COOKIE_NAME,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:7200000})};
const requireAuth=async(req,res,next)=>{try{const token=cookies(req.headers.cookie)[COOKIE_NAME];const payload=jwt.verify(token,process.env.JWT_SECRET,{issuer:'native-cuts',audience:'native-cuts-web'});const user=await User.findById(payload.sub);if(!user)return res.status(401).json({message:'Session expired.'});req.user=user;next()}catch{return res.status(401).json({message:'Authentication required.'})}};
const attempts=new Map();
const authLimit=(req,res,next)=>{const now=Date.now();const key=req.ip;const current=attempts.get(key)||{count:0,reset:now+15*60*1000};if(now>current.reset){current.count=0;current.reset=now+15*60*1000}current.count+=1;attempts.set(key,current);if(current.count>20)return res.status(429).json({message:'Too many attempts. Try again later.'});next()};

app.post('/api/auth/register',authLimit,async(req,res)=>{const name=String(req.body.name||'').trim().slice(0,80);const email=String(req.body.email||'').trim().toLowerCase();const password=String(req.body.password||'');if(name.length<2||!/^\S+@\S+\.\S+$/.test(email)||password.length<10)return res.status(400).json({message:'Use a valid name, email, and a password of at least 10 characters.'});if(await User.exists({email}))return res.status(409).json({message:'An account already exists for this email.'});const user=await User.create({name,email,password,role:'user'});issueSession(res,user);res.status(201).json({user:publicUser(user)})});
app.post('/api/auth/login',authLimit,async(req,res)=>{const email=String(req.body.email||'').trim().toLowerCase();const password=String(req.body.password||'');const user=await User.findOne({email}).select('+password');if(!user||!(await user.matchPassword(password)))return res.status(401).json({message:'Invalid email or password.'});issueSession(res,user);res.json({user:publicUser(user)})});
app.get('/api/auth/me',requireAuth,(req,res)=>res.json({user:publicUser(req.user)}));
app.post('/api/auth/logout',requireAuth,(_req,res)=>{res.clearCookie(COOKIE_NAME,{path:'/',sameSite:'strict'});res.sendStatus(204)});
app.get('/api/admin/access',requireAuth,(req,res)=>req.user.role==='admin'?res.json({allowed:true}):res.status(403).json({message:'Administrator access required.'}));
app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({message:'Request could not be completed.'})});

await connectDb();
app.listen(PORT,()=>console.log(`Native Cuts API listening on ${PORT}`));
