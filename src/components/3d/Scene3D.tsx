import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import BuildingModel from './BuildingModel';
import CameraController from './CameraController';

const Scene3D: React.FC = () => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={45} />
      
      <color attach="background" args={['#F5F2EB']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#FF4D00" />
      
      <Suspense fallback={null}>
        <BuildingModel />
        <Environment preset="city" />
      </Suspense>
      
      <CameraController />
    </Canvas>
  );
};

export default Scene3D;
