import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Styles from "../components/Styles";
import Reviews from "../components/Reviews";
import FloatingPlayer from "../components/FloatingPlayer";

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [hash]);

    return(
        <main className="landing-page">
        <Navbar/>
        <Hero/>
        <Services/>
        <Styles/>
        <Reviews/>
        <FloatingPlayer/>
        </main>
    );
}

export default Home;
