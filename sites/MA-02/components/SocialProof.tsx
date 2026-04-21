'use client';

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface ReviewCard {
  author: string;
  role: string;
  content: string;
  initial: string;
}

const reviews: ReviewCard[] = [
  {
    author: 'Dr. Sarah Chen',
    role: 'Neurosurgeon, Massachusetts General Hospital',
    content: 'NeuroLens transformed our surgical planning workflow. 45 seconds instead of hours.',
    initial: 'S',
  },
  {
    author: 'Dr. Marcus Johnson',
    role: 'Neuro-Oncologist, Dana-Farber',
    content: 'The accessibility features make this tool available to every team member.',
    initial: 'M',
  },
  {
    author: 'Dr. Priya Patel',
    role: 'Chief of Radiology, Boston Medical Center',
    content: 'Accuracy on edge cases rivals independent radiologist consensus.',
    initial: 'P',
  },
  {
    author: 'Dr. James Wilson',
    role: 'Medical Director, Clinical AI',
    content: 'This is the future of neuro-oncology—fast, accurate, and humane.',
    initial: 'J',
  },
  {
    author: 'Dr. Elena Rodriguez',
    role: 'Surgical Innovation Lead, Harvard Medical School',
    content: 'Abhiraam built something that actually solves real clinical problems.',
    initial: 'E',
  },
];

// Marquee Item
function ReviewCard({ review, delay }: { review: ReviewCard; delay: number }) {
  return (
    <div
      className="flex-shrink-0 w-full sm:w-96 px-6 py-8 bg-gradient-to-br from-navy/50 to-sapphire/50 border border-ice/20 rounded-xl backdrop-blur-sm hover:border-ice/50 transition-colors duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-ice" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Content */}
      <p className="text-ice/80 mb-6 leading-relaxed italic">
        "{review.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ice/30 to-ocean/30 flex items-center justify-center text-sm font-bold text-ice">
          {review.initial}
        </div>
        <div>
          <p className="font-bold text-ice text-sm">{review.author}</p>
          <p className="text-xs text-ice/50">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

// Infinite Marquee
function ReviewMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;
    const contentWidth = content.scrollWidth;

    // Clone content for seamless loop
    const clone = content.cloneNode(true) as HTMLDivElement;
    container.appendChild(clone);

    gsap.to(container, {
      x: -contentWidth,
      duration: contentWidth / 100, // Adjust speed here
      ease: 'none',
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(container);
    };
  });

  return (
    <div className="overflow-hidden py-12">
      <div ref={containerRef} className="flex gap-6">
        <div ref={contentRef} className="flex gap-6">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function SocialProof() {
  return (
    <>
      {/* Social Proof Section */}
      <section className="relative bg-navy text-ice py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              Clinical Validation
            </h2>
            <p className="text-xl text-ice/70 max-w-2xl mx-auto">
              Trusted by leading neurosurgeons and medical AI researchers.
            </p>
          </div>

          {/* Marquee */}
          <ReviewMarquee />

          {/* Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-ice/50">
              *These clinical reviews are fictional representations created for demonstration purposes. They do not represent actual clinician endorsements.
            </p>
          </div>
        </div>

        {/* Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent opacity-20" />
      </section>

      {/* Footer */}
      <footer className="relative bg-navy border-t border-ice/10 text-ice py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black mb-3">NeuroLens</h3>
              <p className="text-sm text-ice/60">
                Accessible neuro-oncology diagnostics powered by AI. Congressional App Challenge Winner 2024.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-ice/70">
                <li><a href="#" className="hover:text-ice transition">Features</a></li>
                <li><a href="#" className="hover:text-ice transition">Demo</a></li>
                <li><a href="#" className="hover:text-ice transition">Documentation</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-ice/70">
                <li><a href="#" className="hover:text-ice transition">About</a></li>
                <li><a href="#" className="hover:text-ice transition">Blog</a></li>
                <li><a href="#" className="hover:text-ice transition">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-ice/70">
                <li><a href="#" className="hover:text-ice transition">Privacy</a></li>
                <li><a href="#" className="hover:text-ice transition">Terms</a></li>
                <li><a href="#" className="hover:text-ice transition">HIPAA</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-ice/10 my-12" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs text-ice/50">
              © {new Date().getFullYear()} NeuroLens. All rights reserved. Built by{' '}
              <span className="text-ice font-semibold">Abhiraam Venigalla</span>.
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              <a href="#" className="text-ice/60 hover:text-ice transition text-sm">GitHub</a>
              <a href="#" className="text-ice/60 hover:text-ice transition text-sm">LinkedIn</a>
              <a href="#" className="text-ice/60 hover:text-ice transition text-sm">Twitter</a>
              <a href="#" className="text-ice/60 hover:text-ice transition text-sm">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
