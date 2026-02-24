import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className=" sm-navbar p-4 z-50 fixed w-full top-0 left-0 md:hidden block ">
        <div className="flex items-center justify-between">
          <Link to="" className="text-2xl font-bold text-white bg-black border border-gray-400 rounded-full">
            <img src="/nativecuts.jpg" alt="Native Cuts Logo" className="h-20 w-20 inline-block rounded-full" />
          </Link>
          
          <ul className=" flex flex-col space-x-4 *:font-semibold *:border *:border-gray-400 font-serif">
            <li className="p-2 rounded bg-black">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-white hover:text-gray-200  ">Home</a>
            </li>
            <li className="p-2 rounded bg-black ">
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-white hover:text-gray-200">Services</a>
            </li>
            <li className="p-2 rounded bg-black">
              <a href="#styles" onClick={(e) => scrollToSection(e, 'styles')} className="text-white hover:text-gray-200">Styles</a>
            </li>
            <li className="p-2 rounded bg-black">
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-white hover:text-gray-200">Pricing</a>
            </li>
            <li className="p-2 rounded bg-black">
              <a href="#review" onClick={(e) => scrollToSection(e, 'review')} className="text-white hover:text-gray-200">Reviews</a>
            </li>
          </ul>

          <div>
              <Link to="/Signin" className="p-2 rounded bg-gray-200 px-8 text-gray-800 border-2 border-gray-400 font-semibold">Sign In🪓</Link>
          </div>
            
        </div>
      </nav>

      <nav className="md-navbar p-4 z-50 fixed w-full top-0 left-0 hidden md:block">
        <div className="flex items-center justify-between">
          <Link to="" className="text-2xl font-bold text-white bg-black border border-gray-400 rounded-full">
            <img src="/nativecuts.jpg" alt="Native Cuts Logo" className="h-20 w-20 inline-block rounded-full" />
          </Link>
          <ul className="flex space-x-4 *:font-semibold *:border *:border-gray-400 league-script-regular">
            <li className="p-2 rounded">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-white hover:text-gray-200">Home</a>
            </li>
            <li className="p-2 rounded ">
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-white hover:text-gray-200">Services</a>
            </li>
            <li className="p-2 rounded ">
              <a href="#styles" onClick={(e) => scrollToSection(e, 'styles')} className="text-white hover:text-gray-200">Styles</a>
            </li>
            <li className="p-2 rounded ">
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-white hover:text-gray-200">Pricing</a>
            </li>
            <li className="p-2 rounded ">
              <a href="#review" onClick={(e) => scrollToSection(e, 'review')} className="text-white hover:text-gray-200">Reviews</a>
            </li>
          </ul>

          <div>
              <Link to="/Signin" className="p-2 rounded bg-gray-200 px-8 text-gray-800 border-2 border-gray-400 font-semibold">Sign In🪓</Link>
          </div>
            
        </div>
      </nav>

      
    </>

    

    
  );
};

export default Navbar;
