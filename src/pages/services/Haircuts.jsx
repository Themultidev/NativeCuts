import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
const gentItems = Array.from({ length: 10 }, (_, i) => `Gent${i + 1}`);
const popItems = Array.from({ length: 10 }, (_, i) => `pop${i + 1}`);
const dredItems = Array.from({ length: 10 }, (_, i) => `dred${i + 1}`);

const ImageSet = ({ serial, onClick, large = false }) => {
  const imgClass = large
    ? 'w-full h-65 object-cover rounded-lg'
    : 'w-28 h-28 object-cover rounded-lg';
  const wrapperClass = large
    ? 'grid grid-cols-3 gap-2 shrink-0 snap-start w-160 cursor-pointer'
    : 'grid grid-cols-3 gap-2 shrink-0 snap-start cursor-pointer';

  return (
    <a
      href="#"
      className={wrapperClass}
      onClick={(e) => {
        e.preventDefault();
        onClick(serial);
      }}
    >
      <img className={imgClass} src="/mike4.jpg" alt={`${serial} style`} />
      <img className={imgClass} src="/mike.jpg" alt={`${serial} style`} />
      <img className={imgClass} src="/mike4.jpg" alt={`${serial} style`} />
    </a>
  );
};

const ScrollSection = ({ items, onItemClick }) => {
  const topItems = items.slice(0, 5);
  const bottomItems = items.slice(5, 10);

  return (
    <div className="flex flex-col space-y-5 w-[90vw] overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
      <div className="flex flex-nowrap space-x-5">
        {topItems.map((serial) => (
          <ImageSet key={serial} serial={serial} onClick={onItemClick} />
        ))}
      </div>
      <div className="flex flex-nowrap space-x-5">
        {bottomItems.length > 0 && (
          <ImageSet serial={bottomItems[0]} onClick={onItemClick} large={true} />
        )}
        {bottomItems.slice(1).map((serial) => (
          <ImageSet key={serial} serial={serial} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
};

const DreadSection = ({ items, onItemClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    {items.map((serial) => (
      <a
        key={serial}
        href="#"
        className="grid grid-cols-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          onItemClick(serial);
        }}
      >
        <img src="/mike4.jpg" alt="Dread hairstyle example - Native Cuts" />
        <img src="/mike.jpg" alt="Dread hairstyle example - Native Cuts" />
        <img src="/mike4.jpg" alt="Dread hairstyle example - Native Cuts" />
      </a>
    ))}
  </div>
);

const Haircuts = () => {
  const [activeTab, setActiveTab] = useState('gent');
  const navigate = useNavigate();

  const handleItemClick = (serial) => {
    navigate(`/login?service=haircut&style=${encodeURIComponent(serial)}`);
  };

  const getButtonClass = (tab) => {
    const base = 'p-2 rounded-2xl shadow-2xl font-semibold transition-all hover:bg-[#e0ba69]';
    if (tab === activeTab) {
      return `${base} bg-[#e0ba69] text-black border-3 border-gray-700`;
    }
    return `${base} bg-cyan-900 border-2 border-amber-50`;
  };

  return (
    <>
    <Navbar/>
    <div className="py-20 bg-black text-center min-h-screen flex flex-col items-center justify-center">
      <section className="px-5 md:px-10 min-h-screen w-full py-15 space-y-4" id="styles">
        <h1 className="text-3xl font-extrabold underline decoration-amber-500 decoration-4 underline-offset-8 mt-10 text-white text-center">
          Hair Styles
        </h1>
        <p className="text-sm text-white text-center font-mono">
          Choose from our many listed styles or book an{' '}
          <span className="-skew-x-12 inline-block bg-white text-black">Emergency Hair Cut 🚨</span>
          if missing
        </p>

        <div className="mt-10">
          <button className={getButtonClass('gent')} onClick={() => setActiveTab('gent')}>
            Gentle Men
          </button>
          <button className={getButtonClass('pop')} onClick={() => setActiveTab('pop')}>
            Pop Styles
          </button>
          <button className={getButtonClass('dred')} onClick={() => setActiveTab('dred')}>
            Dreads
          </button>
        </div>

        {activeTab === 'gent' && (
          <div className="md:px-1">
            <h2 className="text-2xl text-white">Gentle Men</h2>
            <ScrollSection items={gentItems} onItemClick={handleItemClick} />
          </div>
        )}

        {activeTab === 'pop' && (
          <div className="md:px-1">
            <h2 className="text-2xl text-white">Pop styles</h2>
            <ScrollSection items={popItems} onItemClick={handleItemClick} />
          </div>
        )}

        {activeTab === 'dred' && (
          <div className="md:px-1">
            <h2 className="text-2xl text-white">Dread</h2>
            <DreadSection items={dredItems} onItemClick={handleItemClick} />
          </div>
        )}
      </section>
    </div>
    </>
  );
};

export default Haircuts;
