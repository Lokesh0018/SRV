import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene3D from '../components/3d/Scene3D';
import HeroOverlay from '../components/hero/HeroOverlay';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
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
      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Scene3D />
      </div>

      {/* HTML Overlays */}
      <HeroOverlay />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

export default Home;
