import { Link } from 'react-router-dom';

const services = [
  {
    name: 'Haircut',
    description: 'Book a professional haircut or grooming session.',
    link: '/SignIn',
  },
  {
    name: 'Beard Trim/Shave',
    description: 'Book a professional beard trim or clean shave.',
    link: '/SignIn',
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
    <div className="bg-[url('/lastank.jpg')] bg-cover bg-center text-center min-h-screen flex flex-col items-center justify-center">
      <section>
        <h1 className="text-white text-3xl mb-8 font-semibold">
          Choose Your Service
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-200">
          {services.map((service) => (
            <Link
              key={service.name}
              to={service.link}
              className="bg-gray-900 p-6 rounded-2xl text-white hover:bg-gray-800 cursor-pointer transition"
            >
              <h2 className="text-xl font-medium mb-2">{service.name}</h2>
              <p className="text-sm text-gray-400">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Start;
