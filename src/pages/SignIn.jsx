import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

const styles = `.auth-page{min-height:100vh;display:grid;place-items:center;padding:90px 20px;background:#000 url('/lastank.jpg') center/cover fixed;font-family:Inter,ui-sans-serif,system-ui,sans-serif;position:relative}.auth-page:before{content:"";position:absolute;inset:0;background:#0008}.auth-card{position:relative;width:min(100%,460px);padding:42px 38px;background:rgba(8,7,5,.88);border:1px solid #ffffff1c;border-radius:24px;color:#f0ebe0;backdrop-filter:blur(14px)}.auth-back{display:inline-flex;margin-bottom:32px;color:#d4ab4a;text-decoration:none;font-size:13px}.auth-kicker{margin:0 0 8px;color:#d4ab4a;font-size:12px;font-weight:700}.auth-title{margin:0;font-size:40px;line-height:1.1;letter-spacing:-.04em}.auth-copy{margin:12px 0 28px;color:#c8beaa99;font-size:14px;line-height:1.5}.auth-booking{padding:12px 16px;border-radius:24px;background:#ffffff0d;font-size:13px}.auth-booking strong{color:#d4ab4a}.auth-form{display:grid;gap:18px;margin-top:24px}.auth-field{display:grid;gap:7px}.auth-field label{font-size:12px;font-weight:700;color:#c8beaa}.auth-field input{width:100%;padding:13px 14px;border:1px solid #ffffff24;border-radius:4px;background:#ffffff0a;color:#fff;font:400 14px Inter,ui-sans-serif,system-ui,sans-serif;outline:none}.auth-field input:focus{border-color:#d4ab4a}.auth-submit{padding:15px 24px;border:1px solid #d4ab4a;border-radius:999px;background:#451a03;color:#fff;font-size:14px;font-weight:700;cursor:pointer}.auth-submit:disabled{opacity:.5}.auth-error{margin:0;color:#ff9f8e;font-size:13px}.auth-toggle{margin:22px 0 0;text-align:center;color:#c8beaa99;font-size:14px}.auth-toggle button{border:0;background:none;color:#d4ab4a;font-weight:700;text-decoration:underline;cursor:pointer}@media(max-width:520px){.auth-card{padding:28px 24px}.auth-title{font-size:32px}}`;

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const service = searchParams.get('service');
  const style = searchParams.get('style');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault(); setError(''); setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(isSignUp ? '/api/auth/register' : '/api/auth/login', { method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.get('name'),email:form.get('email'),password:form.get('password')}) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to continue.');
      navigate(data.user.role === 'admin' ? '/native-control-7f3a9d' : '/dashboard');
    } catch (requestError) { setError(requestError.message); } finally { setLoading(false); }
  };

  return <><style>{styles}</style><main className="auth-page"><section className="auth-card">
    <Link to="/" className="auth-back">Back to home</Link><p className="auth-kicker">Native Cuts Studio</p>
    <h1 className="auth-title">{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
    <p className="auth-copy">Your cuts, appointments and Native recommendations in one place.</p>
    {service && style && <p className="auth-booking">Booking <strong>{style}</strong> — {service.replace('-', ' ')}</p>}
    <form onSubmit={handleSubmit} className="auth-form">
      {isSignUp && <div className="auth-field"><label htmlFor="name">Full name</label><input id="name" name="name" required placeholder="John Doe" /></div>}
      <div className="auth-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required placeholder="john@example.com" /></div>
      <div className="auth-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" minLength="10" required placeholder="At least 10 characters" /></div>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="auth-submit" disabled={loading} type="submit">{loading ? 'Checking…' : isSignUp ? 'Create account' : 'Log in'}</button>
    </form>
    <p className="auth-toggle">{isSignUp ? 'Already have an account?' : 'New to Native Cuts?'} <button type="button" onClick={() => setIsSignUp((value) => !value)}>{isSignUp ? 'Log in' : 'Sign up'}</button></p>
  </section></main></>;
};
export default SignIn;
