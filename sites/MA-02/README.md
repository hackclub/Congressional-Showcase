# NeuroLens Landing Page

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 18
- **3D Rendering**: Three.js + React Three Fiber (@react-three/fiber, @react-three/drei)
- **Smooth Scrolling**: Lenis (@studio-freight/react-lenis)
- **Animations**: GSAP (@gsap/react) with ScrollTrigger & DrawSVG
- **Styling**: Tailwind CSS

## Color Palette

- **Ice**: #B9D6F2 (Highlight Text)
- **Navy**: #061A40 (Primary Background)
- **Royal**: #0353A4 (Primary CTA)
- **Ocean**: #006DAA (Secondary CTA)
- **Sapphire**: #003559 (Secondary Background)

## Project Structure

```
/app
  /layout.tsx          - Root layout with Lenis provider
  /page.tsx            - Main page with all sections
  /globals.css         - Global styles & Tailwind directives

/components
  /Navbar.tsx          - Sticky glassmorphic navbar
  /LenisProvider.tsx   - Lenis smooth scroll wrapper

/public
  - Static assets
```

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

Visit `http://localhost:3000` to see the development server.

## Phase 1: Complete ✅

- [x] Tailwind config with exact color system
- [x] Lenis smooth scroll provider
- [x] Sticky glassmorphism navbar
- [x] Placeholder sections for all 5 parts

## Phase 2: Coming Next

- 3D Brain model (R3F) with draggable interaction
- Scroll-jacking camera animation
- MRI cross-section plane
- Top-down morphing to UI
