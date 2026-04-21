'use client';

import React, { ReactNode } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
