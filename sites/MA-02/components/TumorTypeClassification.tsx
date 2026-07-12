'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TumorType {
  name: string;
  description: string;
  accuracy: number;
  characteristics: string[];
  clinicalSignificance: string;
  icon: string;
  color: string;
}

const tumorTypes: TumorType[] = [
  {
    name: 'Glioma',
    description: 'High-grade malignant tumor requiring aggressive intervention',
    accuracy: 97.3,
    characteristics: [
      'Infiltrative borders',
      'Perilesional edema',
      'Irregular morphology',
      'Often affects eloquent regions',
    ],
    clinicalSignificance:
      'Most aggressive tumor type. Requires urgent neurosurgical consultation and multimodal treatment.',
    icon: '🔴',
    color: '#0353A4',
  },
  {
    name: 'Meningioma',
    description: 'Generally benign tumor with well-defined dural attachment',
    accuracy: 94.8,
    characteristics: [
      'Well-demarcated boundary',
      'Dural attachment visible',
      'Minimal surrounding edema',
      'Often en-plaque growth',
    ],
    clinicalSignificance:
      'Benign in majority. Precise boundary identification enables safe surgical resection with dural separation.',
    icon: '🟡',
    color: '#006DAA',
  },
  {
    name: 'Pituitary Adenoma',
    description: 'Endocrine-secreting tumor in complex sellar anatomy',
    accuracy: 98.2,
    characteristics: [
      'Sellar/suprasellar location',
      'Chiasmal compression effect',
      'Endocrine abnormalities',
      'Variable enhancement pattern',
    ],
    clinicalSignificance:
      'Requires endocrinology involvement. Visual field monitoring essential. Often responsive to medical therapy first-line.',
    icon: '🟢',
    color: '#B9D6F2',
  },
];

export default function TumorTypeClassification() {
  const containerRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Stagger animation for tumor type cards
    typesRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
        }
      );

      // Animate accuracy counter
      const accuracyElement = card.querySelector('.accuracy-value');
      if (accuracyElement) {
        const targetAccuracy = tumorTypes[index].accuracy;
        gsap.to(accuracyElement, {
          innerHTML: Math.floor(targetAccuracy),
          duration: 2,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        });
      }
    });
  });

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-sapphire via-navy to-navy py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black text-ice mb-6">
            Tumor Type Classification
          </h2>
          <p className="text-xl text-ice/70 max-w-2xl mx-auto">
            NeuroLens accurately distinguishes between three major brain tumor types with clinical precision
          </p>
        </div>

        {/* Tumor Types Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tumorTypes.map((tumor, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) typesRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy/40 to-navy/20 border border-ice/10 p-8 hover:border-ice/30 transition-all duration-300"
            >
              {/* Background gradient accent */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: tumor.color }}
              />

              {/* Icon */}
              <div className="text-6xl mb-6">{tumor.icon}</div>

              {/* Name */}
              <h3 className="text-3xl font-bold text-ice mb-3">{tumor.name}</h3>

              {/* Description */}
              <p className="text-ice/70 mb-6 line-clamp-2">{tumor.description}</p>

              {/* Accuracy Score */}
              <div className="mb-8 p-4 bg-navy/50 rounded-xl border border-ice/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-royal accuracy-value">
                    {Math.floor(tumor.accuracy)}
                  </span>
                  <span className="text-ice/60">% accuracy</span>
                </div>
                <p className="text-xs text-ice/50 mt-2">Classification confidence</p>
              </div>

              {/* Characteristics */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-ice/80 mb-3 uppercase tracking-wide">
                  Key Characteristics
                </h4>
                <ul className="space-y-2">
                  {tumor.characteristics.map((char, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-ocean mt-1">✓</span>
                      <span className="text-sm text-ice/70">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical Significance */}
              <div className="pt-6 border-t border-ice/10">
                <h4 className="text-xs font-bold text-ice/60 mb-3 uppercase tracking-wide">
                  Clinical Significance
                </h4>
                <p className="text-sm text-ice/70 leading-relaxed">
                  {tumor.clinicalSignificance}
                </p>
              </div>

              {/* Color bar indicator */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-all group-hover:h-2"
                style={{ backgroundColor: tumor.color }}
              />
            </div>
          ))}
        </div>

        {/* Detection Capability Highlights */}
        <div className="bg-gradient-to-r from-ocean/10 to-royal/10 border border-ocean/20 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-ice mb-8">Detection Capabilities</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Classification */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🧠</div>
                <div>
                  <h4 className="text-xl font-bold text-ice mb-2">Multi-Class Classification</h4>
                  <p className="text-ice/70">
                    Distinguishes gliomas, meningiomas, and pituitary tumors with 96% average accuracy,
                    enabling appropriate treatment pathway selection.
                  </p>
                </div>
              </div>
            </div>

            {/* Segmentation */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h4 className="text-xl font-bold text-ice mb-2">Precise Segmentation</h4>
                  <p className="text-ice/70">
                    Binary mask generation with 0.85-0.89 IoU enables surgical margin planning and
                    volumetric analysis for treatment monitoring.
                  </p>
                </div>
              </div>
            </div>

            {/* Detection */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h4 className="text-xl font-bold text-ice mb-2">Tumor Detection</h4>
                  <p className="text-ice/70">
                    98% detection accuracy identifies presence/absence of tumors with high sensitivity,
                    reducing missed diagnoses in screening workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Clinical Integration */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🤖</div>
                <div>
                  <h4 className="text-xl font-bold text-ice mb-2">AI-Assisted Diagnosis</h4>
                  <p className="text-ice/70">
                    NeuroLens Assistant provides clinical context and recommendations, supporting
                    clinicians with evidence-based decision support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance by MRI Protocol */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-ice mb-8">Protocol Performance</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { protocol: 'T1-Weighted', accuracy: 97.8 },
              { protocol: 'T2-Weighted', accuracy: 98.2 },
              { protocol: 'T1 + Contrast', accuracy: 98.5 },
              { protocol: 'FLAIR', accuracy: 96.3 },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-navy/30 border border-ice/10 text-center hover:border-ocean/40 transition-all"
              >
                <p className="text-ice/60 text-sm mb-3">{item.protocol}</p>
                <div className="text-4xl font-bold text-royal mb-2">{item.accuracy}%</div>
                <p className="text-xs text-ice/50">Average Accuracy</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
