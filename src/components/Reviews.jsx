import { useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const reviews = [
  {
    name: 'Chidi O.',
    text: 'Best barber in the area no cap. Walked in looking rough, walked out looking like money. The line-up was surgical.',
    rating: 5,
  },
  {
    name: 'Tunde A.',
    text: 'I been going to Native Cuts for months now. Every time the cut is consistent and clean. They actually listen to what you want.',
    rating: 5,
  },
  {
    name: 'Emeka K.',
    text: 'Brought my son for his first proper cut and they handled him well. Patient, professional and the kid left smiling. We coming back.',
    rating: 5,
  },
  {
    name: 'David M.',
    text: 'The home service is elite. Called them for an event, barber pulled up on time and did the whole squad. 10/10.',
    rating: 5,
  },
  {
    name: 'Femi J.',
    text: 'Got my dreads retwisted here and the attention to detail was crazy. Clean shop, good vibes, fair prices. What more do you want?',
    rating: 4,
  },
  {
    name: 'Kola B.',
    text: 'First time here and I\'m already a regular. The beard trim alone was worth it. These guys know what they\'re doing.',
    rating: 5,
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Reviews = () => {
  useEffect(() => {
    new Swiper('.reviews-swiper', {
      modules: [Autoplay, Pagination],
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.reviews-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }, []);

  return (
    <section className="px-5 md:px-10 min-h-screen w-full bg-black py-20 space-y-10" id="review">
      <div className="space-y-5">
        <h1 className="text-3xl font-extrabold underline decoration-amber-500 decoration-4 underline-offset-8 text-white text-center">
          Reviews
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold text-left">
          See what other people say about us and leave your review
        </h2>
      </div>

      <div className="reviews-swiper swiper w-full overflow-hidden">
        <div className="swiper-wrapper">
          {reviews.map((review, index) => (
            <div key={index} className="swiper-slide">
              <div className="border border-gray-700 rounded-xl p-6 bg-gray-900 h-full flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-amber-500 text-4xl leading-none">&ldquo;</span>
                  <p className="text-gray-300 text-sm leading-relaxed mt-2">{review.text}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-900 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <span className="text-white font-semibold text-sm">{review.name}</span>
                  </div>
                  <Stars count={review.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-pagination flex justify-center mt-8"></div>
      </div>
    </section>
  );
};

export default Reviews;
