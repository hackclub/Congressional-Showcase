'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface BrainSceneProps {
  cuttingPlaneY: number;
  cameraRotationX: number;
  cameraPosZ: number;
}

// Placeholder Brain Mesh (Simple geometric approximation)
function BrainMesh({ cuttingPlaneY }: { cuttingPlaneY: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(({ mouse }) => {
    if (meshRef.current) {
      // Subtle mouse-tracking rotation
      meshRef.current.rotation.x = mouse.y * 0.3;
      meshRef.current.rotation.y = mouse.x * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Main Brain Sphere (placeholder for GLB model) */}
      <mesh position={[0, 0, 0]} castShadow>
        <icosahedronGeometry args={[1.5, 5]} />
        <meshPhongMaterial
          color="#0353A4"
          emissive="#006DAA"
          emissiveIntensity={0.3}
          wireframe={false}
          shininess={100}
        />
      </mesh>

      {/* Horizontal Cutting Plane - MRI Cross Section */}
      <mesh position={[0, cuttingPlaneY, 0.1]} rotation={[0, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial
          color="#B9D6F2"
          emissive="#006DAA"
          emissiveIntensity={0.5}
          wireframe={false}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Glowing Torus Ring Around Cutting Plane */}
      <mesh position={[0, cuttingPlaneY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.08, 32, 64]} />
        <meshStandardMaterial
          color="#B9D6F2"
          emissive="#0353A4"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

// Camera Controller - responds to scroll
function CameraController({ rotationX, posZ }: { rotationX: number; posZ: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Smooth lerp for camera position
    camera.position.z += (posZ - camera.position.z) * 0.08;
    camera.rotation.x += (rotationX - camera.rotation.x) * 0.08;
  });

  return null;
}

// Canvas Wrapper Component
export default function BrainCanvas({
  cuttingPlaneY,
  cameraRotationX,
  cameraPosZ,
}: BrainSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      shadows
      dpr={1.5}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[0, 0, 5]} intensity={0.3} />

      {/* 3D Scene */}
      <BrainMesh cuttingPlaneY={cuttingPlaneY} />

      {/* Camera Controller */}
      <CameraController rotationX={cameraRotationX} posZ={cameraPosZ} />

      {/* Controls - disabled during scroll animation */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
        maxPolarAngle={Math.PI * 0.6}
      />
    </Canvas>
  );
}
