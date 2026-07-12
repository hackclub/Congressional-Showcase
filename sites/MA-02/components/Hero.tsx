'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BrainScene from '@/components/BrainScene';

gsap.registerPlugin(ScrollTrigger);

// Main Hero Component with Scroll Orchestration
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const [cuttingPlaneY, setCuttingPlaneY] = useState(0);
  const [cameraRotationX, setCameraRotationX] = useState(0);
  const [cameraPosZ, setCameraPosZ] = useState(3.5);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isReady, setIsReady] = useState(false);

  // Wait for hydration before rendering canvas
  useEffect(() => {
    setIsReady(true);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Scroll-linked animation using ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom center',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;

        // Cutting plane moves from -1 to 1 as user scrolls through section
        setCuttingPlaneY(gsap.utils.interpolate(-1, 1, progress));

        // Camera dollies up and pitches down 90° as progress increases
        setCameraRotationX(gsap.utils.interpolate(0, -Math.PI / 2, progress));
        setCameraPosZ(gsap.utils.interpolate(3.5, 0.5, progress));

        // Fade out text overlay in second half of scroll
        setTextOpacity(Math.max(0, 1 - Math.max(0, (progress - 0.5) * 2)));
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, { dependencies: [] });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-navy via-navy to-sapphire"
    >
      {/* 3D Canvas Container - Only render after hydration */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full"
      >
        {isReady && (
          <BrainScene
            cuttingPlaneY={cuttingPlaneY}
            cameraRotationX={cameraRotationX}
            cameraPosZ={cameraPosZ}
          />
        )}
      </div>

      {/* Text Overlay */}
      <div
        ref={textOverlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        style={{
          opacity: textOpacity,
          transition: 'opacity 0.05s ease-out',
        }}
      >
        <h1 className="text-7xl md:text-8xl font-black text-ice drop-shadow-2xl tracking-tight mb-6">
          NeuroLens
        </h1>
        <p className="text-xl md:text-2xl text-ice/80 max-w-3xl text-center drop-shadow-lg mb-8">
          AI-Powered Precision Medicine for Brain Tumor Detection & Segmentation
        </p>
        
        {/* Real Performance Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-royal mb-2">96%</div>
            <div className="text-sm text-ice/70">Classification Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean mb-2">98%</div>
            <div className="text-sm text-ice/70">Detection Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-sapphire mb-2">0.85</div>
            <div className="text-sm text-ice/70">Segmentation IoU</div>
          </div>
        </div>

        <div className="absolute bottom-12 text-ice/60 animate-pulse">
          <p className="text-sm">Scroll to explore real clinical examples</p>
          <svg
            className="w-5 h-5 mx-auto mt-2 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-sapphire via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
