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

const Start = () => {
  return (
    <div
      className="bg-[url('/lastank.jpg')] bg-cover bg-center text-center min-h-screen flex flex-col items-center justify-center px-5 py-16"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backgroundBlendMode: 'multiply' }}
    >
     
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#b8973a] mb-3">
        Premium Grooming Studio
      </p>
      <h1 className="section-title">Choose Your Service</h1>
      <div className="section-divider"><div className="section-diamond" /></div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[960px]">
        {services.map((service, i) => (
          <Link
            key={service.name}
            to={service.link}
            className="group bg-[rgba(8,7,5,0.72)] border border-white/[0.07] rounded p-8 no-underline flex flex-col backdrop-blur-md shadow-lg
                       hover:bg-[rgba(18,15,9,0.88)] hover:border-[#b8973a]/35 hover:-translate-y-1 hover:shadow-xl transition-all duration-250"
          >
            
            <div className="flex items-start justify-between mb-4">
              <span className="text-[11px] text-[#b8973a]/40 tracking-wide">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#b8973a]/25 border border-[#b8973a]/50 group-hover:bg-[#b8973a] transition-colors" />
            </div>

            
            <h2 className="text-xl font-semibold text-[#f0ebe0] tracking-wide mb-2">
              {service.name}
            </h2>

           
            <div className="w-6 h-px bg-[#b8973a]/40 mb-3 group-hover:w-11 transition-all duration-300" />

           
            <p className="text-xs text-[rgba(200,190,170,0.45)] leading-relaxed font-light flex-1">
              {service.description}
            </p>

           
            <span className="inline-flex items-center gap-1.5 mt-5 text-[10px] tracking-[0.28em] uppercase text-[#b8973a]/55 font-medium group-hover:text-[#b8973a] group-hover:gap-2.5 transition-all duration-300">
              Book Now →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Start;
