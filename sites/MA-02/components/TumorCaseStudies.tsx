'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TumorCase {
  title: string;
  type: string;
  location: string;
  accuracy: number;
  iou: number;
  volume: string;
  metrics: string[];
  color: string;
}

const tumorCases: TumorCase[] = [
  {
    title: 'Glioma - Temporal Lobe',
    type: 'High-Grade Glioma',
    location: 'Left Temporal Lobe',
    accuracy: 97.3,
    iou: 0.89,
    volume: '18.4 cm³',
    metrics: ['Precision: 0.97', 'Recall: 0.96', 'F1-Score: 0.96'],
    color: '#0353A4',
  },
  {
    title: 'Meningioma - Parasagittal',
    type: 'Benign Meningioma',
    location: 'Right Parasagittal',
    accuracy: 94.8,
    iou: 0.87,
    volume: '12.7 cm³',
    metrics: ['Precision: 0.92', 'Recall: 0.94', 'F1-Score: 0.93'],
    color: '#006DAA',
  },
  {
    title: 'Pituitary Adenoma - Sellar',
    type: 'Pituitary Tumor',
    location: 'Sella turcica',
    accuracy: 98.2,
    iou: 0.85,
    volume: '9.2 cm³',
    metrics: ['Precision: 0.99', 'Recall: 0.99', 'F1-Score: 0.99'],
    color: '#B9D6F2',
  },
];

export default function TumorCaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Stagger animation for case cards
    gsap.fromTo(
      casesRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      }
    );

    // Animate accuracy bars
    tumorCases.forEach((_, index) => {
      const accuracyBar = casesRef.current[index]?.querySelector(
        '.accuracy-bar'
      ) as HTMLElement;
      if (accuracyBar) {
        gsap.fromTo(
          accuracyBar,
          { width: '0%' },
          {
            width: `${tumorCases[index].accuracy}%`,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: casesRef.current[index],
              start: 'top 80%',
            },
          }
        );
      }
    });
  });

  return (
    <section ref={containerRef} className="min-h-screen bg-gradient-to-b from-navy to-sapphire py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black text-ice mb-6">
            Real Clinical Cases
          </h2>
          <p className="text-xl text-ice/70 max-w-2xl mx-auto">
            NeuroLens in Action: Verified tumor detection, classification, and segmentation from real-world MRI scans
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tumorCases.map((caseStudy, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) casesRef.current[index] = el;
              }}
              className="bg-navy/50 backdrop-blur-md border border-ice/20 rounded-2xl p-8 hover:border-ocean/60 hover:bg-navy/70 hover:shadow-lg hover:shadow-ocean/20 transition-all duration-300 cursor-pointer"
            >
              {/* Case Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-ice mb-2">
                  {caseStudy.title}
                </h3>
                <p className="text-sm text-ice/60">{caseStudy.type}</p>
              </div>

              {/* Location Badge */}
              <div className="inline-block bg-ocean/20 border border-ocean/40 rounded-full px-4 py-2 mb-6">
                <p className="text-sm text-ocean font-medium">{caseStudy.location}</p>
              </div>

              {/* Key Metrics */}
              <div className="space-y-4 mb-8">
                {/* Accuracy */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-ice/80 font-medium">Classification Accuracy</span>
                    <span className="text-royal font-bold">{caseStudy.accuracy}%</span>
                  </div>
                  <div className="w-full h-2 bg-navy/50 rounded-full overflow-hidden border border-royal/20">
                    <div
                      className="accuracy-bar h-full bg-gradient-to-r from-royal to-ocean rounded-full"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>

                {/* IoU Score */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-ice/80 font-medium">Segmentation IoU</span>
                    <span className="text-sapphire font-bold">{caseStudy.iou}</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded ${
                          i < Math.floor(caseStudy.iou * 10)
                            ? 'bg-sapphire'
                            : 'bg-navy/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <div className="flex justify-between">
                    <span className="text-ice/80 font-medium">Tumor Volume</span>
                    <span className="text-ice/60">{caseStudy.volume}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="border-t border-ice/10 pt-6 space-y-2">
                {caseStudy.metrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-ocean" />
                    <span className="text-sm text-ice/70">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-royal/20 to-ocean/20 border border-ocean/30 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-ice mb-8">Performance Summary</h3>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-royal mb-3">96%</div>
              <p className="text-ice/70 font-medium">Avg Classification Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-ocean mb-3">98%</div>
              <p className="text-ice/70 font-medium">Detection Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-ice mb-3">0.87</div>
              <p className="text-ice/70 font-medium">Avg Segmentation IoU</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-ice mb-3">4ms</div>
              <p className="text-ice/70 font-medium">Inference Time/Slice</p>
            </div>
          </div>
        </div>

        {/* Clinical Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-navy/30 border border-ice/10 hover:border-royal/60 hover:bg-navy/50 hover:shadow-lg hover:shadow-royal/20 transition-all duration-300 cursor-pointer">
            <div className="text-4xl mb-4">🏥</div>
            <h4 className="text-xl font-bold text-ice mb-3">Surgical Planning</h4>
            <p className="text-ice/70">
              Precise tumor boundary segmentation enables accurate resection margins and eloquent cortex mapping
            </p>
          </div>
          <div className="p-8 rounded-xl bg-navy/30 border border-ice/10 hover:border-ocean/60 hover:bg-navy/50 hover:shadow-lg hover:shadow-ocean/20 transition-all duration-300 cursor-pointer">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-ice mb-3">Rapid Assessment</h4>
            <p className="text-ice/70">
              4-millisecond per-slice processing provides fast diagnosis to support immediate clinical decision-making
            </p>
          </div>
          <div className="p-8 rounded-xl bg-navy/30 border border-ice/10 hover:border-sapphire/60 hover:bg-navy/50 hover:shadow-lg hover:shadow-sapphire/20 transition-all duration-300 cursor-pointer">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-xl font-bold text-ice mb-3">Volumetry Analysis</h4>
            <p className="text-ice/70">
              Accurate tumor volume calculation supports treatment planning and longitudinal surveillance monitoring
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
