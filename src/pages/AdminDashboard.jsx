import { Link } from 'react-router-dom';

const AdminDashboard = () => <main style={{minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'Inter,system-ui',padding:'40px'}}>
  <nav style={{maxWidth:1200,margin:'0 auto 80px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><Link to="/"><img src="/nativecuts.jpg" alt="Native Cuts" style={{width:64,height:64,borderRadius:'50%'}}/></Link><span style={{padding:'10px 16px',border:'1px solid #fff',borderRadius:999}}>Administrator</span></nav>
  <section style={{maxWidth:1200,margin:'auto',padding:'48px',borderRadius:40,background:'#f0f0ec',color:'#1a1a1a'}}><p style={{color:'#451a03',fontWeight:700}}>Native control room</p><h1 style={{fontSize:'clamp(42px,7vw,82px)',lineHeight:1,margin:'12px 0'}}>Admin access is secured.</h1><p style={{maxWidth:620,lineHeight:1.6}}>This is the protected starting point for managing Observe styles, advertisements, appointments, users and the landing-page soundtrack.</p></section>
</main>;
export default AdminDashboard;
