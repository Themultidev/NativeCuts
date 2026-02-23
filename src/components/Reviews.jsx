import { useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const reviews = [
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis sequi qui tempore praesentium odio tenetur facere nemo! Repellendus vitae hic mollitia dignissimos assumenda sequi et voluptates in laborum qui quasi, quibusdam eum totam ex quidem, odio exercitationem ratione ipsam numquam?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a impedit quis fugiat repellat quam molestias odio aspernatur. Exercitationem velit ad rerum totam quae culpa aliquam doloremque iste fuga vel, cum odio? Sint dolorum molestiae autem ipsam nam maiores rem.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus atque expedita, dolor voluptas officiis repellendus! Possimus sequi cum harum maiores perferendis! Iure, hic delectus? Doloremque sunt nisi provident iure quaerat amet veritatis, odio deleniti voluptas blanditiis, magni excepturi? Temporibus, cumque!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab eligendi, distinctio quia nulla ratione dignissimos eveniet officiis perferendis voluptatibus suscipit, autem eius. Consequatur earum totam, enim quae quod, voluptatem corporis optio deleniti tempora, fuga hic?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, debitis? Laborum mollitia modi non, repellendus iure laudantium rerum sunt. Molestias natus quidem, ex nisi delectus atque praesentium ea qui explicabo iure quis vero temporibus error nihil eum. Labore.",
];

const Reviews = () => {
  useEffect(() => {
    new Swiper('.reviews-swiper', {
      modules: [Autoplay],
      loop: true,
      slidesPerView: 2,
      spaceBetween: 10,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }, []);

  return (
    <section className="px-5 md:px-10 min-h-screen m w-full bg-black space-y-10" id="review">
      <div className="space-y-5">
        <h1 className="text-3xl font-extrabold underline decoration-amber-500 decoration-4 underline-offset-8 mt-10 text-white text-center">
          Reviews
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold">
          See what other people say about us and leave your review
        </h2>
      </div>

      <div className="reviews-swiper swiper w-full overflow-x-hidden text-white">
        <div className="swiper-wrapper w-full">
          {reviews.map((review, index) => (
            <div key={index} className="swiper-slide border-2 border-white rounded-lg p-5 bg-gray-800">
              <p>{review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
