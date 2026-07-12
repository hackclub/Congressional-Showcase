'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Odometer Counter Component
function Odometer({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  useGSAP(() => {
    gsap.to(
      { val: 0 },
      {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function () {
          setValue(Math.round(this.targets()[0].val));
        },
      }
    );
  }, { dependencies: [target] });

  return (
    <div className="text-7xl md:text-9xl font-black text-ice tabular-nums tracking-tighter">
      {String(value).padStart(2, '0')}%
    </div>
  );
}

// SVG MRI with Tumor Boundary Animation
function MRIScan() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!svgRef.current) return;

    const strokePath = svgRef.current.querySelector('#tumor-boundary') as SVGPathElement;
    if (!strokePath) return;

    // Get the path length for dash animation
    const pathLength = strokePath.getTotalLength();

    // Start with dashed line hidden
    gsap.set(strokePath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate on scroll
    ScrollTrigger.create({
      trigger: svgRef.current,
      start: 'center bottom',
      end: 'center center',
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(strokePath, {
          strokeDashoffset: pathLength * (1 - self.progress),
          duration: 0,
        });
      },
    });
  });

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg
        ref={svgRef}
        viewBox="0 0 256 256"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 0 20px rgba(179, 106, 231, 0.3))' }}
      >
        {/* MRI Background Circle */}
        <circle cx="128" cy="128" r="120" fill="#003559" stroke="#B9D6F2" strokeWidth="2" opacity="0.3" />

        {/* Simulated MRI Brain Scan (simplified) */}
        <g opacity="0.4">
          <ellipse cx="128" cy="100" rx="45" ry="50" fill="#0353A4" />
          <ellipse cx="110" cy="130" rx="25" ry="30" fill="#0353A4" />
          <ellipse cx="146" cy="130" rx="25" ry="30" fill="#0353A4" />
          <ellipse cx="128" cy="160" rx="30" ry="35" fill="#0353A4" />
        </g>

        {/* Tumor Boundary - Animated SVG Path */}
        <path
          id="tumor-boundary"
          d="M 120 140 Q 130 125, 145 130 Q 150 140, 145 150 Q 135 155, 120 150 Q 115 145, 120 140"
          fill="none"
          stroke="#FF6B6B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Glow Filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Crosshair */}
        <circle cx="128" cy="128" r="3" fill="#B9D6F2" />
        <line x1="128" y1="110" x2="128" y2="146" stroke="#B9D6F2" strokeWidth="1" opacity="0.3" />
        <line x1="110" y1="128" x2="146" y2="128" stroke="#B9D6F2" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* Tooltip */}
      <div className="absolute top-4 right-4 bg-navy/80 backdrop-blur px-3 py-2 rounded text-xs text-ice border border-ice/20">
        <p className="font-bold">Tumor Boundary</p>
        <p className="text-ice/60">High precision mapping</p>
      </div>
    </div>
  );
}

// Main Component
export default function TheTech() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-navy text-ice overflow-hidden py-20"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ocean rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-royal rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Odometer & Stats */}
          <div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
              The Tech
            </h2>
            <p className="text-xl text-ice/70 mb-12">
              Trained on 50,000+ de-identified MRI scans with surgical validation.
            </p>

            {/* Odometer */}
            <div className="mb-12 p-8 bg-gradient-to-br from-royal/10 to-ocean/10 border border-ice/20 rounded-2xl backdrop-blur">
              <p className="text-sm font-medium text-ice/60 mb-4">Training Accuracy</p>
              <Odometer target={97} />
              <div className="mt-6 space-y-2 text-sm text-ice/60">
                <p>✓ 95th percentile on independent test set</p>
                <p>✓ {'<'}60ms inference on edge devices</p>
                <p>✓ HIPAA {'&'} FDA-ready pipeline</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-navy/50 border border-ice/10 rounded-lg">
                <p className="text-xs text-ice/50 mb-1">Edge Accuracy</p>
                <p className="text-2xl font-bold text-ice">94.2%</p>
              </div>
              <div className="p-4 bg-navy/50 border border-ice/10 rounded-lg">
                <p className="text-xs text-ice/50 mb-1">Processing Time</p>
                <p className="text-2xl font-bold text-ice">45s</p>
              </div>
            </div>
          </div>

          {/* Right: MRI Scan with Animated Boundary */}
          <div className="sticky top-32 h-fit">
            <MRIScan />
          </div>
        </div>
      </div>

      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent opacity-20" />
    </section>
  );
}
