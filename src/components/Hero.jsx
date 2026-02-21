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
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-10">
          <h1 className="text-6xl font-bold text-amber-50">Welcome to Native cuts</h1>
          <p className="text-amber-50 text-2xl">
            where precision meets perfection <span className="font-bold">. </span>
            <span className="-skew-x-12 inline-block bg-amber-950 p-2">NATIVE!</span>
          </p>
          <div className="flex gap-2 *:p-2 *:border-2 *:border-gray-400">
            <Link className="bg-amber-950 font-semibold cursor-pointer md:text-sm text-white" to="/start">Get Started</Link>
            <a className="bg-white font-semibold cursor-pointer md:text-sm">Emergency Cut 🚨</a>
          </div>

        </div>

        <div className="md:grid md:grid-cols-[1fr_2fr] flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center mt-10 md:flex-col space-y-4 md:mt-0">
            {/* Scissors SVG */}
            <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M16.1898 2H7.81976C4.17976 2 2.00977 4.17 2.00977 7.81V16.18C2.00977 19.82 4.17976 21.99 7.81976 21.99H16.1898C19.8298 21.99 21.9998 19.82 21.9998 16.18V7.81C21.9998 4.17 19.8298 2 16.1898 2Z" fill="#292D32"/>
              <path d="M14.1692 11.9899L17.7692 9.29992C18.0992 9.04992 18.1692 8.57992 17.9192 8.24992C17.6692 7.91992 17.1992 7.84992 16.8692 8.09992L12.9192 11.0499L10.5192 9.24992C10.5292 9.15992 10.5492 9.06992 10.5492 8.96992C10.5492 7.69992 9.51921 6.66992 8.24921 6.66992C6.97921 6.66992 5.94922 7.69992 5.94922 8.96992C5.94922 10.2399 6.97921 11.2699 8.24921 11.2699C8.86921 11.2699 9.42918 11.0199 9.84918 10.6199L11.6792 11.9899L9.83923 13.3699C9.42923 12.9799 8.86922 12.7299 8.25922 12.7299C6.98922 12.7299 5.95923 13.7599 5.95923 15.0299C5.95923 16.2999 6.98922 17.3299 8.25922 17.3299C9.52922 17.3299 10.5592 16.2999 10.5592 15.0299C10.5592 14.9299 10.5392 14.8299 10.5292 14.7299L12.9392 12.9299L16.8892 15.8799C17.0192 15.9799 17.1792 16.0299 17.3392 16.0299C17.5692 16.0299 17.7892 15.9299 17.9392 15.7299C18.1892 15.3999 18.1192 14.9299 17.7892 14.6799L14.1692 11.9899Z" fill="#292D32"/>
            </svg>

            {/* Barber pole SVG */}
            <svg className="animate-bounce rotate-180 md:rotate-0" width="80px" height="80px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M882.313259 105.814292c44.82058 25.894914 60.165714 83.215385 34.302769 128.067935l-185.772033 321.736318c-25.894914 44.82058-83.215385 60.197683-128.035965 34.302769l-32.096906-18.510069 18.989603-32.896132 260.515626-451.210889 32.096906 18.510068z" fill="#5FCEFF"/>
              <path d="M850.216353 87.304224l-260.515626 451.210889-18.989603 32.896132-22.729981 39.385845-38.55465-66.751334 282.989854-490.117199 57.640161 33.27976z" fill="#FF4893"/>
              <path d="M652.360026 788.960495c9.143143-12.627767 21.035622-23.561175 35.389716-31.841154 54.69901-31.553433 124.58331-12.819581 156.168712 41.84746 31.553433 54.667041 12.819581 124.58331-41.84746 156.136742-54.667041 31.553433-124.58331 12.819581-156.136743-41.84746-0.927102-1.598452-1.790266-3.196903-2.62146-4.795354-20.300334-39.321907-15.600887-85.517155 9.047235-119.500234z" fill="#FFB578"/>
              <path d="M554.534794 622.210034l97.825232 166.750461c-24.648122 33.983079-29.34757 80.178327-9.047235 119.500234l-132.607537-229.0581-39.609628-68.445694-41.943367-72.441822-260.515626-451.210889v-0.095907l57.831976-33.27976 282.957884 490.117199 38.55465 66.751334 6.553651 11.412944z" fill="#FFB578"/>
              <path d="M471.095626 610.956935l39.609628 68.445694-3.516593 2.046018-133.662514 231.519715-0.319691-0.191814c23.305423-40.792482 18.701883-89.96085-7.832412-125.350567l105.625675-176.437077 0.095907-0.031969z" fill="#FF4893"/>
              <path d="M429.152259 538.515113l18.989604 32.896132-32.064938 18.510069c-44.852549 25.894914-102.17302 10.517811-128.067934-34.302769l-185.740064-321.736318c-25.894914-44.852549-10.54978-102.17302 34.302769-128.067935l32.064937-18.510068 260.515626 451.210889z" fill="#FFB578"/>
              <path d="M365.374044 787.425981c26.534295 35.389716 31.137835 84.558084 7.832412 125.350567-0.063938 0.159845-0.159845 0.31969-0.255752 0.479535-31.585402 54.667041-101.469701 73.400893-156.136743 41.84746-54.69901-31.553433-73.400893-101.469701-41.84746-156.136742s101.469701-73.400893 156.136743-41.84746c13.778652 7.960288 25.255534 18.350223 34.2708 30.30664z" fill="#5FCEFF"/>
            </svg>

            {/* Razor SVG */}
            <svg className="animate-pulse rotate-180 md:rotate-0" width="90px" height="90px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <polygon style={{fill:'#83C7C3'}} points="500.09,141.855 457.57,184.375 399.828,160.31 467.607,109.37 497.875,111.585"/>
                <polygon style={{fill:'#83C7C3'}} points="435.115,76.879 384.175,144.658 334.851,95.335 402.631,44.395 432.9,46.61"/>
              </g>
              <g>
                <polygon style={{fill:'#9AE1D3'}} points="467.607,109.37 408.247,168.73 375.756,136.238 435.115,76.879 465.384,79.093"/>
                <polygon style={{fill:'#9AE1D3'}} points="402.631,44.395 343.271,103.755 327.619,54.424 370.139,11.904 400.409,14.117"/>
              </g>
              <path style={{fill:'#3D7A94'}} d="M109.201,441.608c-15.358,15.358-50.468,50.468-50.468,50.468 c-10.718,10.718-28.097,10.718-38.806-0.008c-10.71-10.71-10.718-28.08,0-38.798c0,0,35.11-35.11,50.468-50.468L109.201,441.608z"/>
              <path style={{fill:'#0E4675'}} d="M322.108,60.238C283.133,101.402,47.282,350.59,29.449,370.713 c-10.794,12.175-11.51,30.151-0.008,41.652l70.195,70.195c11.501,11.501,29.478,10.786,41.653-0.008 c20.082-17.807,268.562-253.001,310.458-292.675L322.108,60.238z"/>
              <path style={{fill:'#83C7C3'}} d="M280.687,254.579c9.001,9.001,9.009,23.592,0,32.601c-9.001,9.001-23.592,8.992-32.593-0.008 l-23.263-23.263c-4.505-4.505-6.753-10.407-6.753-16.301c0-5.894,2.248-11.797,6.744-16.293c9.009-9.009,23.6-9.001,32.601,0 L280.687,254.579z"/>
              <path style={{fill:'#6BADB4'}} d="M327.619,54.424c0,0-2.06,2.16-5.512,5.814c-40.87,45.383-46.716,107.542-12.305,141.953 c34.344,34.344,96.595,28.355,141.944-12.313c3.873-3.671,5.823-5.504,5.823-5.504L327.619,54.424z"/>
            </svg>
          </div>

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
