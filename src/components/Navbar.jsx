import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className=" sm-navbarblock md:hidden  bg-[url('/lastank.jpg')] p-4 z-50 fixed w-full top-0 left-0  border-b border-gray-400 ">
        
        <div className="flex items-center justify-between">
          
          <Link to="" className="text-2xl font-bold text-white bg-black border border-gray-400 rounded-full">
            <img src="/nativecuts.jpg" alt="Native Cuts Logo" className="h-10 w-10 inline-block rounded-full" />
          </Link>


          
          <div>
            <button className="text-white hover:text-gray-200 border" onClick={()=>handleOpen()}>hamm</button>
          </div>

        
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full h-fit bg-black absolute top-19 z-10 bg-cover bg-center p-4`}>
          <div className='flex flex-col space-y-2 '>
          
            <ul className=" flex flex-col space-y-4 *:font-semibold font-serif text-center">
              <li >
                <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-white hover:text-gray-200  ">Home</a>
              </li>
              <li >
                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-white hover:text-gray-200">Services</a>
              </li>
              <li>
                <a href="#styles" onClick={(e) => scrollToSection(e, 'styles')} className="text-white hover:text-gray-200">Styles</a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-white hover:text-gray-200">Pricing</a>
              </li>
              <li>
                <a href="#review" onClick={(e) => scrollToSection(e, 'review')} className="text-white hover:text-gray-200">Reviews</a>
              </li>
            </ul>

            <div className='text-center'>
                <Link to="/SignIn" className="p-2 rounded bg-gray-200 px-8 text-gray-800 border-2 border-gray-400 font-semibold">Sign In🪓</Link>
            </div>
          </div>
        </div>

      </nav>

      <nav className="md-navbar p-4 bg-[url('/lastank.jpg')] z-50 fixed w-full top-0 left-0 md:block hidden">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white bg-black border border-gray-400 rounded-full">
            <img src="/nativecuts.jpg" alt="Native Cuts Logo" className="md:h-14 md:w-14 lg:h-20 lg:w-20 inline-block rounded-full" />
          </Link>
          <ul className="flex md:space-x-2 lg:space-x-4 *:font-semibold md:text-lg lg:text-3xl league-script-regular">
            <li className="p-2 ">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-white hover:text-gray-200">Home</a>
            </li>
            <li className="p-2 ">
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-white hover:text-gray-200">Services</a>
            </li>
            <li className="p-2  ">
              <a href="#styles" onClick={(e) => scrollToSection(e, 'styles')} className="text-white hover:text-gray-200">Styles</a>
            </li>
            <li className="p-2 ">
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-white hover:text-gray-200">Pricing</a>
            </li>
            <li className="p-2  ">
              <a href="#review" onClick={(e) => scrollToSection(e, 'review')} className="text-white hover:text-gray-200">Reviews</a>
            </li>
          </ul>

          <div>
              <Link to="/SignIn" className="p-2 rounded bg-gray-200 px-8 text-gray-800 border-2 border-gray-400 font-semibold">Sign In🪓</Link>
          </div>
            
        </div>
      </nav>

      
    </>

    

    
  );
};

export default Navbar;
