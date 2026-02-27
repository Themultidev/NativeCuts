import { useState } from 'react';
import SectionHeader from './SectionHeader';

const ImageGrid = ({ images, className = '' }) => (
  <div className={`grid grid-cols-3 gap-2 shrink-0 snap-start ${className}`}>
    {images.map((src, i) => (
      <img key={i} className={`${className.includes('w-160') ? 'w-full h-65' : 'w-28 h-28'} object-cover rounded-lg`} src={src} alt="Hairstyle example - Native Cuts" />
    ))}
  </div>
);

const ScrollGallery = () => {
  const smallSet = ['/mike4.jpg', '/mike.jpg', '/mike4.jpg'];
  const largeSet = ['/mike4.jpg', '/mike.jpg', '/mike4.jpg'];

  return (
    <div className="flex flex-col space-y-5 w-[90vw] overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
      <div className="flex flex-nowrap space-x-5">
        {[...Array(5)].map((_, i) => (
          <ImageGrid key={`small-top-${i}`} images={smallSet} />
        ))}
      </div>
      <div className="flex flex-nowrap space-x-5">
        <div className="grid grid-cols-3 gap-2 shrink-0 snap-start w-160">
          {largeSet.map((src, i) => (
            <img key={i} className="w-full h-65 object-cover rounded-lg" src={src} alt="Large hairstyle example - Native Cuts" />
          ))}
        </div>
        {[...Array(4)].map((_, i) => (
          <ImageGrid key={`small-bottom-${i}`} images={smallSet} />
        ))}
      </div>
    </div>
  );
};

const DreadGrid = () => {
  const set = ['/mike4.jpg', '/mike.jpg', '/mike4.jpg'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="grid grid-cols-3">
          {set.map((src, j) => (
            <img key={j} src={src} alt="Dread hairstyle example" />
          ))}
        </div>
      ))}
    </div>
  );
};

const Styles = () => {
  const [activeTab, setActiveTab] = useState('gent');

  const getButtonClass = (tab) => {
    const base = 'p-2 rounded-2xl shadow-2xl border-2 font-semibold transition-all hover:bg-[#e0ba69]';
    if (tab === activeTab) {
      return `${base} bg-[#e0ba69] text-black border-gray-700`;
    }
    return `${base} bg-cyan-900 border-amber-50`;
  };

  return (
    <section className="px-5 md:px-10 min-h-screen w-full bg-black py-15 space-y-4" id="styles">
      <SectionHeader title="Hair Styles" />
      <p className="text-sm text-white text-center font-mono">
        Choose from our many listed styles or book an{' '}
        <span className="-skew-x-12 inline-block bg-white text-black">Emergency Hair Cut 🚨</span>
        if missing
      </p>

      <div className="mt-10 space-x-2">
        <button className={getButtonClass('gent')} onClick={() => setActiveTab('gent')}>Gentle Men</button>
        <button className={getButtonClass('pop')} onClick={() => setActiveTab('pop')}>Pop Styles</button>
        <button className={getButtonClass('dred')} onClick={() => setActiveTab('dred')}>Dreads</button>
      </div>

      {activeTab === 'gent' && (
        <div className="px-1">
          <h2 className="text-2xl text-white">Gentle Men</h2>
          <ScrollGallery />
        </div>
      )}

      {activeTab === 'pop' && (
        <div className="overflow-x-scroll w-[90vw]">
          <h2 className="text-2xl text-white">Pop styles</h2>
          <ScrollGallery />
        </div>
      )}

      {activeTab === 'dred' && (
        <div className="overflow-x-scroll w-[90vw]">
          <h2 className="text-2xl text-white">Dread</h2>
          <DreadGrid />
        </div>
      )}
    </section>
  );
};

export default Styles;
