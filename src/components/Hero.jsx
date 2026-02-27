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
      <div className="flex flex-col space-y-15 md:space-y-10  md:flex-row items-center justify-between">
        
        <div className="flex flex-col space-y-5 md:space-y-10 ">
          
          <h1 className=" text-5xl md:text-6xl  md:font-bold text-amber-50 text-center md:text-left ">Welcome to Native cuts</h1>
          
          <p className="text-amber-50 text-[15px] md:text-2xl  text-center md:text-left">
             <span className="font-thin md:font-normal">where precision meets perfection. </span>
            <span className="-skew-x-12 inline-block bg-amber-950 p-2">NATIVE!</span>
          </p>
          
          <div className="flex justify-center gap-2 *:p-2 *:border-2 *:border-gray-400 md:justify-start ">
            <Link className="bg-amber-950 font-semibold cursor-pointer md:text-sm text-white" to="/start">Get Started</Link>
            <a className="bg-white font-semibold cursor-pointer md:text-sm">Emergency Cut 🚨</a>
          </div>

        </div>

        <div className="flex items-center justify-center ">
          

          <div className="hero-swiper swiper w-full max-w-[400px] md:w-[300px] lg:w-[400px] border-2  border-gray-500 overflow-hidden md:rounded-lg rounded-2xl">
            <div className="swiper-wrapper *:p-5 ">
              <div className="swiper-slide ">
                <img src="/mike.jpg" className="object-contain md:object-cover w-full h-[30vh] md:h-[80vh]" alt="Native Cuts hairstyle example 1" />
              </div>
              <div className="swiper-slide ">
                <img src="/mike2.jpg" className="object-contain md:object-cover w-full h-[30vh] md:h-[80vh]" alt="Native Cuts hairstyle example 2" />
              </div>
              <div className="swiper-slide ">
                <img src="/mike3.jpg" className="object-contain md:object-cover w-full h-[30vh] md:h-[80vh]" alt="Native Cuts hairstyle example 3" />
              </div>
              <div className="swiper-slide ">
                <img src="/mike4.jpg" className="object-contain md:object-cover w-full h-[30vh] md:h-[80vh]" alt="Native Cuts hairstyle example 4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
