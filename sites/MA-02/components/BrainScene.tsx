'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BrainSceneProps {
  cuttingPlaneY: number;
  cameraRotationX: number;
  cameraPosZ: number;
}

// Tumor data representing real NeuroLens detections
const TUMOR_SCENARIOS = [
  {
    name: 'Glioma',
    position: { x: -0.3, y: 0.2, z: 0.1 },
    size: { x: 0.6, y: 0.7, z: 0.5 },
    color: 0xff6b6b, // Red for aggressive tumor
    emissive: 0xff0000,
    intensity: 0.8,
    opacity: 0.7,
  },
  {
    name: 'Meningioma',
    position: { x: 0.4, y: -0.3, z: 0.2 },
    size: { x: 0.5, y: 0.5, z: 0.4 },
    color: 0xffd93d, // Yellow for well-defined tumor
    emissive: 0xffaa00,
    intensity: 0.6,
    opacity: 0.75,
  },
  {
    name: 'Pituitary',
    position: { x: 0, y: -0.8, z: 0 },
    size: { x: 0.3, y: 0.4, z: 0.3 },
    color: 0x6bcaff, // Blue for pituitary
    emissive: 0x0088ff,
    intensity: 0.7,
    opacity: 0.8,
  },
];

export default function BrainScene({
  cuttingPlaneY,
  cameraRotationX,
  cameraPosZ,
}: BrainSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTumorIndex, setCurrentTumorIndex] = useState(0);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    brainMesh: THREE.Group;
    cuttingPlane: THREE.Mesh;
    torusRing: THREE.Mesh;
    tumorMeshes: THREE.Mesh[];
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x061a40);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xb9d6f2, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0353a4, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x006daa, 0.5);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Brain mesh group
    const brainMesh = new THREE.Group();
    scene.add(brainMesh);

    // Main brain sphere
    const brainGeometry = new THREE.IcosahedronGeometry(1.5, 5);
    const brainMaterial = new THREE.MeshPhongMaterial({
      color: 0x0353a4,
      emissive: 0x006daa,
      emissiveIntensity: 0.3,
      shininess: 100,
    });
    const brainSphere = new THREE.Mesh(brainGeometry, brainMaterial);
    brainSphere.castShadow = true;
    brainMesh.add(brainSphere);

    // Create tumor meshes based on current scenario
    const tumorMeshes: THREE.Mesh[] = [];
    const currentTumor = TUMOR_SCENARIOS[currentTumorIndex];
    
    // Tumor representation (using rounded boxes to simulate tumor shapes)
    const tumorGeometry = new THREE.BoxGeometry(
      currentTumor.size.x,
      currentTumor.size.y,
      currentTumor.size.z,
      8,
      8,
      8
    );
    
    const tumorMaterial = new THREE.MeshStandardMaterial({
      color: currentTumor.color,
      emissive: currentTumor.emissive,
      emissiveIntensity: currentTumor.intensity,
      transparent: true,
      opacity: currentTumor.opacity,
      metalness: 0.3,
      roughness: 0.4,
    });
    
    const tumorMesh = new THREE.Mesh(tumorGeometry, tumorMaterial);
    tumorMesh.position.set(
      currentTumor.position.x,
      currentTumor.position.y,
      currentTumor.position.z
    );
    tumorMesh.castShadow = true;
    brainMesh.add(tumorMesh);
    tumorMeshes.push(tumorMesh);

    // Glow effect around tumor
    const glowGeometry = new THREE.BoxGeometry(
      currentTumor.size.x * 1.3,
      currentTumor.size.y * 1.3,
      currentTumor.size.z * 1.3,
      6,
      6,
      6
    );
    
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: currentTumor.color,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.position.set(
      currentTumor.position.x,
      currentTumor.position.y,
      currentTumor.position.z
    );
    brainMesh.add(glowMesh);

    // Segmentation boundary visualization (as wireframe)
    const boundaryGeometry = new THREE.BoxGeometry(
      currentTumor.size.x * 1.15,
      currentTumor.size.y * 1.15,
      currentTumor.size.z * 1.15
    );
    
    const boundaryMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: currentTumor.color,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    
    const boundaryMesh = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
    boundaryMesh.position.set(
      currentTumor.position.x,
      currentTumor.position.y,
      currentTumor.position.z
    );
    brainMesh.add(boundaryMesh);

    // Cutting plane
    const planeGeometry = new THREE.PlaneGeometry(4, 4);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9d6f2,
      emissive: 0x006daa,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const cuttingPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    cuttingPlane.position.z = 0.1;
    brainMesh.add(cuttingPlane);

    // Glowing torus ring
    const torusGeometry = new THREE.TorusGeometry(2.2, 0.08, 32, 64);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9d6f2,
      emissive: 0x0353a4,
      emissiveIntensity: 1.2,
    });
    const torusRing = new THREE.Mesh(torusGeometry, torusMaterial);
    torusRing.rotation.x = Math.PI / 2;
    brainMesh.add(torusRing);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      brainMesh,
      cuttingPlane,
      torusRing,
      tumorMeshes,
    };

    // Mouse tracking
    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      brainMesh.rotation.x = y * 0.3;
      brainMesh.rotation.y = x * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Handle window resize
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    let frameId: number;
    let tumorRotationTime = 0;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      tumorRotationTime += 0.016; // ~60fps

      // Apply scroll-driven updates
      cuttingPlane.position.y = cuttingPlaneY;
      torusRing.position.y = cuttingPlaneY;

      // Smooth camera interpolation
      camera.position.z += (cameraPosZ - camera.position.z) * 0.08;
      camera.rotation.x += (cameraRotationX - camera.rotation.x) * 0.08;

      // Auto-rotate if no scroll happening
      brainMesh.rotation.z += 0.0005;

      // Animate tumor meshes
      if (sceneRef.current && sceneRef.current.tumorMeshes) {
        sceneRef.current.tumorMeshes.forEach((mesh, index) => {
          // Rotate tumors
          mesh.rotation.x += 0.003;
          mesh.rotation.y += 0.004;
          
          // Pulsing animation
          const pulse = 0.95 + Math.sin(tumorRotationTime + index) * 0.05;
          mesh.scale.set(pulse, pulse, pulse);
        });
        
        // Cycle through tumor types every 8 seconds
        const shouldCycleTumor = Math.floor(tumorRotationTime / 8) !== Math.floor((tumorRotationTime - 0.016) / 8);
        if (shouldCycleTumor) {
          setCurrentTumorIndex((prev) => (prev + 1) % TUMOR_SCENARIOS.length);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      brainGeometry.dispose();
      brainMaterial.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
    };
  }, [cuttingPlaneY, cameraRotationX, cameraPosZ, currentTumorIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }}
    />
  );
}
