"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const Ecosystem3D = dynamic(() => import("@/components/canvas/Ecosystem3D"), {
  ssr: false,
});

export default function GlobalImpact() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll to drive the SVG curve and the 3D evolution
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // The connecting drop line from Process curves into the center
  const pathLength = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  
  // The 3D component starts to form as the line hits the center
  const shapeScale = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const shapeOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const shapeRotate = useTransform(scrollYProgress, [0.3, 0.8], [0, 180]);

  return (
    // Removed top padding (pt-0) and border-t to seamlessly merge with the bottom of Process.tsx
    // Background explicitly set to #020202 to match
    <section ref={containerRef} className="pt-0 pb-32 relative bg-[#020202] overflow-hidden">
      {/* Heavy glow effect behind the Ecosystem Trace */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-indigo-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>

      {/* Aligned with Process: gap-16 md:gap-24 */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Aligned left column: w-full md:w-5/12 */}
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md w-max"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Global Scale. Local Precision.</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-gray-500"
          >
            A Digital Ecosystem Engineered for Dominance.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12"
          >
            We deploy sophisticated architectures, data-driven aesthetics, and relentless growth systems that don&apos;t just compete—they monopolize attention in your market.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-8"
          >
            <div className="border-l-2 border-indigo-500/30 pl-6">
               <div className="text-4xl font-extrabold text-white mb-2">24/7</div>
               <div className="text-sm uppercase tracking-widest text-indigo-400 font-semibold">Brand Uptime</div>
            </div>
            <div className="border-l-2 border-indigo-500/30 pl-6">
               <div className="text-4xl font-extrabold text-white mb-2">∞</div>
               <div className="text-sm uppercase tracking-widest text-indigo-400 font-semibold">Scalable ROI</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll-Driven Continuity Line & 3D Evolution */}
        {/* Aligned right column: w-full md:w-7/12 */}
        <div className="w-full md:w-7/12 h-[500px] md:h-[600px] relative mt-16 md:mt-0">
          
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Tracking line dropped seamlessly from Process (ml-[4.5rem] aligns with Process track) */}
          <div className="hidden md:block absolute left-0 top-0 w-full h-full pointer-events-none">
            <svg viewBox="0 0 400 600" className="w-full h-full text-white stroke-current stroke-2 fill-none overflow-visible">
               {/* 
                 Line starts at exactly the same X coordinate as the Process line (roughly x: 72).
                 It drops down and gracefully sweeps into the center of the structure (x: 200, y: 300) to feed the 3D entity. 
               */}
               <motion.path 
                 d="M 72 0 L 72 150 C 72 250, 200 200, 200 300"
                 style={{ pathLength: pathLength }}
                 strokeDashoffset="0"
                 strokeLinecap="round"
                 className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
               />
            </svg>
          </div>

          {/* The Evolving 3D Mesh */}
          {/* It remains invisible and scaled to 0 until the scroll line hits the center, then it rapidly 'ignites' and spins. */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ 
              scale: shapeScale, 
              opacity: shapeOpacity,
              rotate: shapeRotate 
            }}
          >
             <Ecosystem3D />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
