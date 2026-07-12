'use client';

import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-ice/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Author Info */}
        <div className="text-ice font-medium tracking-tight text-sm md:text-base">
          Abhiraam Venigalla | MA-02
        </div>

        {/* Right: View Demo Button */}
        <a
          href="/demo.mp4"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-royal text-ice rounded-lg font-medium tracking-tight text-sm hover:bg-ocean transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          View Demo
        </a>
      </div>
    </nav>
  );
}
