'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type UIState = 'upload' | 'processing' | 'subtyping';

interface AppLifecycleStep {
  state: UIState;
  title: string;
  description: string;
  details: string[];
}

const steps: AppLifecycleStep[] = [
  {
    state: 'upload',
    title: 'Step 1: Upload',
    description: 'Seamlessly import MRI scans from hospital PACS systems or direct file upload.',
    details: [
      'Drag-and-drop interface',
      'DICOM format support',
      'Real-time validation',
      'HIPAA-compliant encryption',
    ],
  },
  {
    state: 'processing',
    title: 'Step 2: Processing',
    description: 'Advanced AI models analyze brain imaging in under 60 seconds.',
    details: [
      'GPU-accelerated inference',
      'Multi-model ensemble',
      'Confidence scoring',
      'Real-time progress tracking',
    ],
  },
  {
    state: 'subtyping',
    title: 'Step 3: Subtyping',
    description: 'Clinically actionable tumor classification and surgical guidance.',
    details: [
      'Tumor boundary mapping',
      'Risk stratification',
      'Surgical route optimization',
      'Downloadable report',
    ],
  },
];

// Mobile Frame Component
function MobileFrame({ state }: { state: UIState }) {
  const getContent = () => {
    switch (state) {
      case 'upload':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="w-16 h-16 rounded-full border-2 border-ice/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-center text-ice font-medium">Upload MRI Scan</p>
            <p className="text-center text-ice/50 text-xs mt-2">Drag or tap to select</p>
          </div>
        );
      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
            <div className="w-12 h-12 rounded-full border-3 border-ocean border-t-ice animate-spin" />
            <p className="text-center text-ice font-medium">Analyzing...</p>
            <div className="w-full bg-navy/50 rounded-full h-1 overflow-hidden">
              <div className="bg-ice h-full w-3/4 animate-pulse" />
            </div>
            <p className="text-center text-ice/50 text-xs">~45 seconds</p>
          </div>
        );
      case 'subtyping':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 gap-3">
            <div className="w-12 h-12 rounded-full bg-ocean/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-ocean" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-center text-ice font-medium">Analysis Complete</p>
            <p className="text-center text-ice/50 text-xs">Tumor: Glioblastoma</p>
            <button className="mt-3 px-4 py-1.5 bg-ocean text-navy rounded text-xs font-medium hover:bg-ice transition-colors">
              View Report
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Mobile Frame */}
      <div className="bg-navy border-2 border-ice/20 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Notch */}
        <div className="h-6 bg-navy border-b border-ice/10 flex items-center justify-center">
          <div className="w-32 h-4 bg-navy rounded-b-lg" />
        </div>

        {/* Screen Content */}
        <div className="bg-sapphire h-96 flex items-center justify-center text-center">
          {getContent()}
        </div>

        {/* Home Indicator */}
        <div className="h-6 bg-navy flex items-center justify-center">
          <div className="w-32 h-1 bg-ice/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function AppLifecycle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<UIState>('upload');

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const triggers = steps.map((step, index) => {
      return ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `${index * 25}% bottom`,
        end: `${(index + 1) * 25}% bottom`,
        onEnter: () => setActiveStep(step.state),
        onEnterBack: () => setActiveStep(step.state),
      });
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-sapphire text-ice overflow-hidden py-20"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(185,214,242,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(185,214,242,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content - Sticky */}
          <div className="sticky top-32 h-fit">
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                App Lifecycle
              </h2>
              <p className="text-xl text-ice/70 leading-relaxed max-w-md">
                Three intuitive steps transform raw imaging into surgical precision.
              </p>
            </div>

            {/* Step Cards */}
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <button
                  key={step.state}
                  onClick={() => setActiveStep(step.state)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                    activeStep === step.state
                      ? 'bg-ocean/20 border-2 border-ice shadow-lg'
                      : 'bg-transparent border-2 border-ice/20 hover:border-ice/40'
                  }`}
                >
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-ice/70">{step.description}</p>
                  {activeStep === step.state && (
                    <div className="mt-4 pt-4 border-t border-ice/20 space-y-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex gap-2 text-xs text-ice/60">
                          <span className="text-ice">✓</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Mobile Frame - Fixed */}
          <div className="sticky top-32 h-fit lg:h-screen lg:flex lg:items-center lg:justify-center">
            <MobileFrame state={activeStep} />
          </div>
        </div>
      </div>

      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent opacity-20" />
    </section>
  );
}
