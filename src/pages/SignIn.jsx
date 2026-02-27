import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Barlow:wght@300;400;500&display=swap');

  .si-root {
    font-family: 'Barlow', sans-serif;
  }

  .si-card {
    width: 100%;
    max-width: 420px;
    background: rgba(8, 7, 5, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 40px 36px 36px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 40px rgba(0,0,0,0.45);
  }

  .si-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(184, 151, 58, 0.7);
    text-decoration: none;
    margin-bottom: 32px;
    transition: color 0.2s;
  }
  .si-back:hover { color: #b8973a; }

  .si-eyebrow {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #b8973a;
    text-align: center;
    margin-bottom: 10px;
  }

  .si-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 300;
    color: #f0ebe0;
    text-align: center;
    letter-spacing: 0.04em;
    line-height: 1.1;
  }

  .si-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 16px 0 24px;
  }
  .si-divider::before, .si-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(184,151,58,0.35));
  }
  .si-divider::after {
    background: linear-gradient(to left, transparent, rgba(184,151,58,0.35));
  }
  .si-diamond {
    width: 5px;
    height: 5px;
    background: #b8973a;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .si-booking {
    text-align: center;
    font-size: 12px;
    color: rgba(200, 190, 170, 0.45);
    margin-bottom: 28px;
    letter-spacing: 0.03em;
    line-height: 1.6;
  }
  .si-booking span {
    color: #b8973a;
    font-weight: 500;
  }

  .si-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .si-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .si-field label {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(200, 190, 170, 0.5);
    font-weight: 400;
  }

  .si-field input {
    width: 100%;
    padding: 13px 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 3px;
    color: #f0ebe0;
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.03em;
    outline: none;
    transition: border-color 0.25s, background 0.25s;
    box-sizing: border-box;
  }

  .si-field input::placeholder {
    color: rgba(200, 190, 170, 0.2);
  }

  .si-field input:focus {
    border-color: rgba(184, 151, 58, 0.5);
    background: rgba(255, 255, 255, 0.06);
  }

  .si-submit {
    width: 100%;
    padding: 14px;
    background: #b8973a;
    color: #0a0a0a;
    border: none;
    border-radius: 3px;
    font-family: 'Barlow', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 6px;
    transition: background 0.25s, transform 0.15s;
  }
  .si-submit:hover {
    background: #d4ab4a;
    transform: translateY(-1px);
  }
  .si-submit:active {
    transform: translateY(0);
  }

  .si-toggle {
    text-align: center;
    font-size: 12px;
    color: rgba(200, 190, 170, 0.4);
    margin-top: 22px;
    letter-spacing: 0.02em;
  }

  .si-toggle button {
    background: none;
    border: none;
    color: #b8973a;
    font-family: 'Barlow', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.03em;
    cursor: pointer;
    padding: 0;
    margin-left: 5px;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.2s;
  }
  .si-toggle button:hover { opacity: 0.7; }
`;

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service');
  const style = searchParams.get('style');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <>
      <style>{styles}</style>
      <div
        className="bg-[url('/lastank.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center py-20 px-4 si-root"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backgroundBlendMode: 'multiply' }}
      >
        <div className="si-card">
          <Link to="/" className="si-back">← Back to Home</Link>

          <p className="si-eyebrow">Native Cuts Studio</p>
          <h1 className="si-title">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
          <div className="si-divider"><div className="si-diamond" /></div>

          {service && style && (
            <p className="si-booking">
              Booking <span>{style}</span> — {service.replace('-', ' ')}
            </p>
          )}

          <form onSubmit={handleSubmit} className="si-form">
            {isSignUp && (
              <div className="si-field">
                <label>Full Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
            )}

            <div className="si-field">
              <label>Email Address</label>
              <input type="email" required placeholder="johndoe@gmail.com" />
            </div>

            <div className="si-field">
              <label>Password</label>
              <input type="password" required placeholder="••••••••" />
            </div>

            <button type="submit" className="si-submit">
              {isSignUp ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <p className="si-toggle">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
