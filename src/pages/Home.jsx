import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Styles from "../components/Styles";
import Reviews from "../components/Reviews";




const Home = () =>{
    return(
        <>
        <Navbar/>
        <Hero/>
        <Services/>
        <Styles/>
        <Reviews/>
        </>
    );
}

export default Home;