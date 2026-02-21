const serviceItems = [
  { name: 'Hair Cuts', img: '/mike3.jpg', alt: 'Haircut service sample - Native Cuts' },
  { name: 'Beard Trim/Shave', img: '/mike3.jpg', alt: 'Beard trim and shave service - Native Cuts' },
  { name: 'Hair coloring/dye', img: '/mike3.jpg', alt: 'Hair coloring and dye service - Native Cuts' },
  { name: 'Line-up/edge-up', img: '/mike3.jpg', alt: 'Line-up and edge-up service - Native Cuts' },
  { name: 'Facial or scalp treatment', img: '/mike3.jpg', alt: 'Facial and scalp treatment - Native Cuts' },
  { name: 'Kids cut', img: '/mike3.jpg', alt: 'Kids haircuts - Native Cuts' },
];

const premiumItems = [
  { name: 'Home service💎', img: '/mike3.jpg', alt: 'Home service - Native Cuts' },
  { name: 'Escort 📛', img: '/mike3.jpg', alt: 'Escort service - Native Cuts' },
];

const ServiceCard = ({ name, img, alt }) => (
  <div>
    <img className="object-cover h-full w-full rounded-full transition-all hover:scale-150" src={img} alt={alt} />
    <div className="w-25 h-12.5 bg-black rounded-b-full relative -top-[50%] opacity-50 text-center text-white font-extrabold text-sm">
      {name}
    </div>
  </div>
);

const Services = () => {
  return (
    <section className="bg-black md:mx-auto md:w-1/1 flex flex-col items-center justify-between space-y-7 py-20" id="services">
      <h1 className="text-3xl font-extrabold underline decoration-amber-500 decoration-4 underline-offset-8 mt-10 text-white">
        Our Services
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-6 space-x-5 space-y-7 *:rounded-full *:w-[100px] *:h-[100px] *:bg-white p-1 text-sm">
        {serviceItems.map((item) => (
          <ServiceCard key={item.name} {...item} />
        ))}
      </div>

      <div className="flex items-center justify-between space-x-5 *:rounded-full *:w-[100px] *:h-[100px] *:bg-white p-1 text-sm">
        {premiumItems.map((item)=>(
            <ServiceCard  key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Services;
