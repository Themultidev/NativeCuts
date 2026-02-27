import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const Hero = () => {
  useEffect(() => {
    new Swiper('.hero-swiper', {
      modules: [Autoplay],
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }, []);

  return (
    <section className="bg-black min-h-screen py-30 px-5 lg:px-15 w-full" id="home">
      <div className="flex flex-col space-y-10  md:flex-row items-center justify-between">
        <div className=" space-y-5 md:space-y-10 flex flex-col items-center justify-center md:items-start md:justify-start">
          <h1 className="text-6xl font-bold text-amber-50 text-center">Welcome to Native cuts</h1>
          <p className="text-amber-50 text-2xl">
            where precision meets perfection <span className="font-bold">. </span>
            <span className="-skew-x-12 inline-block bg-amber-950 p-2">NATIVE!</span>
          </p>
          <div className="flex gap-2 *:p-2 *:border-2 *:border-gray-400">
            <Link className="bg-amber-950 font-semibold cursor-pointer md:text-sm text-white" to="/start">Get Started</Link>
            <a className="bg-white font-semibold cursor-pointer md:text-sm">Emergency Cut 🚨</a>
          </div>

        </div>

        <div className="flex items-center justify-center">
          

          <div className="hero-swiper swiper w-[400px] md:w-[300px] lg:w-[400px] border-2 border-gray-400 overflow-hidden rounded-lg">
            <div className="swiper-wrapper">
              <div className="swiper-slide p-5">
                <img src="/mike.jpg" className="object-cover w-full h-[70vh] md:h-[80vh]" alt="Native Cuts hairstyle example 1" />
              </div>
              <div className="swiper-slide p-5">
                <img src="/mike2.jpg" className="object-cover w-full h-[70vh] md:h-[80vh]" alt="Native Cuts hairstyle example 2" />
              </div>
              <div className="swiper-slide p-5">
                <img src="/mike3.jpg" className="object-cover w-full h-[70vh] md:h-[80vh]" alt="Native Cuts hairstyle example 3" />
              </div>
              <div className="swiper-slide p-5">
                <img src="/mike4.jpg" className="object-cover w-full h-[70vh] md:h-[80vh]" alt="Native Cuts hairstyle example 4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
