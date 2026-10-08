import React, { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CameraController: React.FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Scroll-based camera animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Animate camera position through different stages
    tl.to(camera.position, { x: 15, y: 12, z: 15, duration: 1 }, 0)
      .to(camera.position, { x: 12, y: 5, z: 20, duration: 1 }, 1)
      .to(camera.position, { x: 0, y: 8, z: 25, duration: 1 }, 2)
      .to(camera.position, { x: -15, y: 15, z: 15, duration: 1 }, 3)
      .to(camera.position, { x: -10, y: 5, z: 20, duration: 1 }, 4);

    return () => {
      tl.kill();
    };
  }, [camera]);

  // Subtle mouse movement
  useFrame((state) => {
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    // Rotate camera slightly based on mouse
    camera.rotation.y = gsap.utils.interpolate(camera.rotation.y, -mouseX * 0.2, 0.05);
    camera.rotation.x = gsap.utils.interpolate(camera.rotation.x, -mouseY * 0.2, 0.05);
    
    camera.lookAt(0, 3, 0);
  });

  return null;
};

export default CameraController;
