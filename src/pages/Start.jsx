import { Link } from 'react-router-dom';

const services = [
  {
    name: 'Haircut',
    description: 'Book a professional haircut or grooming session.',
    link: '/Haircuts',
  },
  {
    name: 'Beard Trim/Shave',
    description: 'Book a professional beard trim or clean shave.',
    link: '/BeardTrimsOrShave',
  },
  {
    name: 'Hair coloring/dye',
    description: 'Explore hair coloring and dye options.',
    link: '/SignIn',
  },
  {
    name: 'Line-up/edge-up',
    description: 'Get a sharp and clean line-up or edge-up.',
    link: '/SignIn',
  },
  {
    name: 'Facial or scalp treatment',
    description: 'Relax with a professional facial or scalp treatment.',
    link: '/SignIn',
  },
  {
    name: 'Kids Cut',
    description: 'Fun and stylish haircuts for the little ones.',
    link: '/SignIn',
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Barlow:wght@300;400;500&display=swap');

  .start-section {
    font-family: 'Barlow', sans-serif;
  }

  .start-eyebrow {
    font-size: 11px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #b8973a;
    text-align: center;
    margin-bottom: 12px;
  }

  .start-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 300;
    color: #f0ebe0;
    text-align: center;
    letter-spacing: 0.05em;
    line-height: 1.1;
  }

  .start-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin: 18px auto 48px;
  }
  .start-divider::before,
  .start-divider::after {
    content: '';
    width: 80px;
    height: 1px;
    background: linear-gradient(to right, transparent, #b8973a);
  }
  .start-divider::after {
    background: linear-gradient(to left, transparent, #b8973a);
  }
  .start-diamond {
    width: 6px;
    height: 6px;
    background: #b8973a;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .start-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    width: min(960px, 90vw);
  }

  @media (max-width: 768px) {
    .start-grid { grid-template-columns: 1fr; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .start-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .start-card {
    position: relative;
    background: rgba(8, 7, 5, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 4px;
    padding: 36px 30px 30px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 0;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }

  .start-card:hover {
    background: rgba(18, 15, 9, 0.88);
    border-color: rgba(184, 151, 58, 0.35);
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(184,151,58,0.1);
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .card-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    color: rgba(184, 151, 58, 0.4);
    letter-spacing: 0.12em;
    padding-top: 2px;
  }

  .card-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(184, 151, 58, 0.25);
    border: 1px solid rgba(184, 151, 58, 0.5);
    transition: background 0.3s;
    flex-shrink: 0;
  }

  .start-card:hover .card-dot {
    background: #b8973a;
  }

  .card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #f0ebe0;
    letter-spacing: 0.03em;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .card-divider {
    width: 24px;
    height: 1px;
    background: rgba(184, 151, 58, 0.4);
    margin-bottom: 12px;
    transition: width 0.3s ease;
  }

  .start-card:hover .card-divider {
    width: 44px;
  }

  .card-desc {
    font-size: 12.5px;
    color: rgba(200, 190, 170, 0.45);
    line-height: 1.75;
    font-weight: 300;
    letter-spacing: 0.01em;
    flex: 1;
  }

  .card-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 22px;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(184, 151, 58, 0.55);
    transition: color 0.3s, gap 0.3s;
    font-weight: 500;
  }

  .start-card:hover .card-cta {
    color: #b8973a;
    gap: 10px;
  }
`;

const Start = () => {
  return (
    <>
      <style>{styles}</style>
      <div
        className="bg-[url('/lastank.jpg')] bg-cover bg-center text-center min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backgroundBlendMode: 'multiply' }}
      >
        <section className="start-section">
          <p className="start-eyebrow">Premium Grooming Studio</p>
          <h1 className="start-title">Choose Your Service</h1>
          <div className="start-divider"><div className="start-diamond" /></div>

          <div className="start-grid">
            {services.map((service, i) => (
              <Link
                key={service.name}
                to={service.link}
                className="start-card"
              >
                <div className="card-top">
                  <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="card-dot" />
                </div>
                <h2 className="card-name">{service.name}</h2>
                <div className="card-divider" />
                <p className="card-desc">{service.description}</p>
                <span className="card-cta">Book Now →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Start;
