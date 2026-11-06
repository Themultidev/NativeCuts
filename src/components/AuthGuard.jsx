import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, admin = false }) => {
  const [state, setState] = useState({ loading: true, allowed: false });
  useEffect(() => {
    fetch(admin ? '/api/admin/access' : '/api/auth/me', { credentials: 'include' })
      .then((response) => { if (!response.ok) throw new Error(); return response.json(); })
      .then(() => setState({ loading: false, allowed: true }))
      .catch(() => setState({ loading: false, allowed: false }));
  }, [admin]);
  if (state.loading) return <div style={{ minHeight:'100vh',display:'grid',placeItems:'center',background:'#000',color:'#fff',fontFamily:'system-ui' }}>Checking secure session…</div>;
  return state.allowed ? children : <Navigate to="/SignIn" replace />;
};
export default AuthGuard;
