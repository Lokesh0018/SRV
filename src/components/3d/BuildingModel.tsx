import React, { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BuildingModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  
  // Elements refs
  const surveyPointsRef = useRef<THREE.Group>(null);
  const foundationRef = useRef<THREE.Mesh>(null);
  const columnsRef = useRef<THREE.Group>(null);
  const floorsRef = useRef<THREE.Group>(null);
  const facadeRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    // Initial hidden states
    if (surveyPointsRef.current) surveyPointsRef.current.scale.set(0, 0, 0);
    if (foundationRef.current) foundationRef.current.scale.set(0, 0, 0);
    if (columnsRef.current) columnsRef.current.position.y = -10;
    if (floorsRef.current) floorsRef.current.scale.set(0, 0, 0);
    if (facadeRef.current) facadeRef.current.material.opacity = 0;

    // Timeline connected to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // 0-20% Survey
    tl.to(surveyPointsRef.current!.scale, { x: 1, y: 1, z: 1, duration: 1 }, 0);
    
    // 20-40% Architecture/Foundation
    tl.to(foundationRef.current!.scale, { x: 1, y: 1, z: 1, duration: 1 }, 1);
    
    // 40-60% Structural (Columns & Beams)
    tl.to(columnsRef.current!.position, { y: 0, duration: 1 }, 2);
    
    // 60-75% Construction (Slabs/Floors)
    tl.to(floorsRef.current!.scale, { x: 1, y: 1, z: 1, duration: 1 }, 3);
    
    // 75-100% Completed (Facade/Interior)
    tl.to(facadeRef.current!.material as THREE.Material, { opacity: 0.8, duration: 1 }, 4);

    return () => {
      tl.kill();
    };
  }, []);

  useFrame((state) => {
    // Subtle breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <gridHelper ref={gridRef} args={[30, 30, '#949494', '#cccccc']} position={[0, -0.01, 0]} />
      
      {/* Survey Points */}
      <group ref={surveyPointsRef}>
        {[[-4, 4], [4, 4], [4, -4], [-4, -4]].map((pos, i) => (
          <mesh key={i} position={[pos[0], 0.1, pos[1]]}>
            <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
            <meshStandardMaterial color="#FF4D00" />
          </mesh>
        ))}
      </group>

      {/* Foundation */}
      <mesh ref={foundationRef} position={[0, 0.25, 0]} receiveShadow castShadow>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="#8c8c8c" />
      </mesh>

      {/* Structural Columns */}
      <group ref={columnsRef}>
        {[-4, -1.5, 1.5, 4].map((x) => 
          [-4, -1.5, 1.5, 4].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 3, z]} castShadow>
              <boxGeometry args={[0.4, 6, 0.4]} />
              <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
            </mesh>
          ))
        )}
      </group>

      {/* Floors */}
      <group ref={floorsRef}>
        {[2, 4, 6].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[10.5, 0.2, 10.5]} />
            <meshStandardMaterial color="#F5F2EB" />
          </mesh>
        ))}
      </group>

      {/* Facade / Glass */}
      <mesh ref={facadeRef} position={[0, 3.1, 0]}>
        <boxGeometry args={[10.8, 6.2, 10.8]} />
        <meshPhysicalMaterial 
          color="#0B132B" 
          transparent 
          opacity={0} 
          transmission={0.9} 
          roughness={0.1} 
          thickness={0.5}
        />
      </mesh>
    </group>
  );
};

export default BuildingModel;
