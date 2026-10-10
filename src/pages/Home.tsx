import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SRVHero from '../components/hero/SRVHero';
import MarqueeSection from '../components/sections/MarqueeSection';
import IdeaSection from '../components/sections/IdeaSection';
import CautionTapeSection from '../components/sections/CautionTapeSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ContactSection from '../components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Force page to load at the top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Basic setup for scroll triggers can go here
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={mainRef}>
      <SRVHero />
      <MarqueeSection />
      <AboutSection />
      <IdeaSection />
      <CautionTapeSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
};

export default Home;
