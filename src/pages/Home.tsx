import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SRVHero from '../components/hero/SRVHero';
import IdeaSection from '../components/sections/IdeaSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ContactSection from '../components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Basic setup for scroll triggers can go here
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={mainRef}>
      <SRVHero />
      <AboutSection />
      <ServicesSection />
      <IdeaSection />
      <ContactSection />
    </main>
  );
};

export default Home;
