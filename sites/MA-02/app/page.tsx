'use client';

import React, { Suspense, lazy } from 'react';

// Lazy load Hero since it contains 3D rendering
const Hero = lazy(() => import('@/components/Hero'));
const TumorTypeClassification = lazy(() => import('@/components/TumorTypeClassification'));
const TumorCaseStudies = lazy(() => import('@/components/TumorCaseStudies'));
const AppLifecycle = lazy(() => import('@/components/AppLifecycle'));
const TheTech = lazy(() => import('@/components/TheTech'));
const TheEdge = lazy(() => import('@/components/TheEdge'));
const SocialProof = lazy(() => import('@/components/SocialProof'));

// Loading fallback
function SectionLoader() {
  return <div className="min-h-screen bg-navy" />;
}

export default function Home() {
  return (
    <main className="bg-navy">
      {/* Section 1: Hero with 3D Brain */}
      <Suspense fallback={<SectionLoader />}>
        <Hero />
      </Suspense>

      {/* Section 2: Tumor Type Classification */}
      <Suspense fallback={<SectionLoader />}>
        <TumorTypeClassification />
      </Suspense>

      {/* Section 3: Real Case Studies */}
      <Suspense fallback={<SectionLoader />}>
        <TumorCaseStudies />
      </Suspense>

      {/* Section 4: App Lifecycle */}
      <Suspense fallback={<SectionLoader />}>
        <AppLifecycle />
      </Suspense>

      {/* Section 5: The Tech */}
      <Suspense fallback={<SectionLoader />}>
        <TheTech />
      </Suspense>

      {/* Section 6: The Edge */}
      <Suspense fallback={<SectionLoader />}>
        <TheEdge />
      </Suspense>

      {/* Section 7: Social Proof & Footer */}
      <Suspense fallback={<SectionLoader />}>
        <SocialProof />
      </Suspense>
    </main>
  );
}
