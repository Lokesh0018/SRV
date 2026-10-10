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
    // Force page to load at the top and clear any hash that might cause auto-jumping
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Clear URL hash without triggering a reload so it doesn't jump to #contact
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Attempt immediately
    window.scrollTo(0, 0);

    // Basic setup for scroll triggers can go here
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  React.useEffect(() => {
    // Refresh ScrollTrigger after fonts, images, and initial layout shifts have settled.
    // This fixes issues where sections (like Services) remain empty because their trigger points were miscalculated.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
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
