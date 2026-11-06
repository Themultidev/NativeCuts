import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Barlow:wght@300;400;500&display=swap');

  .cookie-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeIn 0.4s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .cookie-card {
    width: 100%;
    max-width: 420px;
    background: rgba(8, 7, 5, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 40px 36px 34px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(184,151,58,0.08);
    font-family: 'Barlow', sans-serif;
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cookie-eyebrow {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #b8973a;
    text-align: center;
    margin-bottom: 10px;
  }

  .cookie-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem;
    font-weight: 300;
    color: #f0ebe0;
    text-align: center;
    letter-spacing: 0.04em;
    line-height: 1.1;
    margin-bottom: 0;
  }

  .cookie-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 16px 0 22px;
  }
  .cookie-divider::before, .cookie-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(184,151,58,0.35));
  }
  .cookie-divider::after {
    background: linear-gradient(to left, transparent, rgba(184,151,58,0.35));
  }
  .cookie-diamond {
    width: 5px;
    height: 5px;
    background: #b8973a;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .cookie-text {
    font-size: 13px;
    color: rgba(200, 190, 170, 0.5);
    line-height: 1.75;
    font-weight: 300;
    letter-spacing: 0.02em;
    text-align: center;
    margin-bottom: 28px;
  }

  .cookie-text a {
    color: #b8973a;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .cookie-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .cookie-accept {
    width: 100%;
    padding: 13px;
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
    transition: background 0.2s, transform 0.15s;
  }
  .cookie-accept:hover {
    background: #d4ab4a;
    transform: translateY(-1px);
  }

  .cookie-decline {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 3px;
    color: rgba(200, 190, 170, 0.4);
    font-family: 'Barlow', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .cookie-decline:hover {
    border-color: rgba(255,255,255,0.2);
    color: rgba(200, 190, 170, 0.65);
  }

  /* Contractbook surface treatment */
  .cookie-overlay { background: rgba(26,26,26,.58); backdrop-filter: none; -webkit-backdrop-filter: none; }
  .cookie-card { max-width: 480px; background: #fff; border: 0; border-radius: 40px; padding: 48px; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
  .cookie-eyebrow { color: #1009f6; font-size: 11px; font-weight: 700; letter-spacing: normal; text-transform: none; text-align: left; margin: 0 0 9px; }
  .cookie-title { color: #1a1a1a; font: 700 32px/1.3 Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: -.02em; text-align: left; }
  .cookie-divider { display: none; }
  .cookie-text { color: #4d4d4d; font-size: 16px; line-height: 1.5; font-weight: 400; letter-spacing: normal; text-align: left; margin: 18px 0 28px; }
  .cookie-actions { flex-direction: row; gap: 9px; }
  .cookie-accept,.cookie-decline { width: auto; padding: 14px 22px; border: 1px solid #1a1a1a; border-radius: 999px; font: 700 14px/1 Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: normal; text-transform: none; }
  .cookie-accept { background: #ffba09; color: #1a1a1a; }
  .cookie-accept:hover { background: #ffba09; transform: none; }
  .cookie-decline { background: transparent; color: #1a1a1a; }
  .cookie-decline:hover { border-color: #1a1a1a; color: #1a1a1a; }
  @media (max-width: 520px) { .cookie-card { padding: 28px; border-radius: 24px; } .cookie-actions { flex-direction: column; } .cookie-accept,.cookie-decline { width: 100%; } }
`;

const CookiePopup = ({ onAccept, onDecline }) => (
  <div className="cookie-overlay">
    <style>{styles}</style>
    <div className="cookie-card">
      <p className="cookie-eyebrow">Native Cuts Studio</p>
      <h2 className="cookie-title">Cookie Notice</h2>
      <div className="cookie-divider"><div className="cookie-diamond" /></div>
      <p className="cookie-text">
        This site uses cookies to enhance your experience and remember your preferences.
        By continuing, you agree to our use of cookies.
      </p>
      <div className="cookie-actions">
        <button className="cookie-accept" onClick={onAccept}>Accept All</button>
        <button className="cookie-decline" onClick={onDecline}>Decline</button>
      </div>
    </div>
  </div>
);

const PageCookies = () => {
  const [visible, setVisible] = useState(() => !Cookies.get('nativeCutsConsent'));

  const handleAccept = () => {
    Cookies.set('nativeCutsConsent', 'true', { expires: 365 });
    setVisible(false);
  };

  const handleDecline = () => {
    Cookies.set('nativeCutsConsent', 'false', { expires: 30 });
    setVisible(false);
  };

  return (
    <>
      <Outlet />
      {visible && <CookiePopup onAccept={handleAccept} onDecline={handleDecline} />}
    </>
  );
};

export default PageCookies;
