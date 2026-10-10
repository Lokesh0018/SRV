import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const mountedAt = useRef(0);

  useLayoutEffect(() => {
    // Force page to load at the top and clear any hash that might cause auto-jumping
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Clear URL hash without triggering a reload so it doesn't jump to #contact
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    mountedAt.current = Date.now();

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

  // In-app links such as /#services (from the nav or another page) should land on
  // that section. A fresh page load keeps the original behaviour of starting at the top.
  React.useEffect(() => {
    if (location.key === 'default' || !location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const align = (smooth: boolean) => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById(id)?.scrollIntoView({ behavior: smooth && !reduced ? 'smooth' : 'auto', block: 'start' });
    };

    // Already on the page: just glide to the section.
    if (Date.now() - mountedAt.current > 600) {
      align(true);
      return;
    }

    // Arrived from another page: pinned sections and images are still settling and keep
    // moving the target, so jump after the initial refresh and re-align on each later refresh.
    const realign = () => align(false);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      realign();
      ScrollTrigger.addEventListener('refresh', realign);
    }, 650);
    const stop = setTimeout(() => ScrollTrigger.removeEventListener('refresh', realign), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(stop);
      ScrollTrigger.removeEventListener('refresh', realign);
    };
  }, [location.key, location.hash]);

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
