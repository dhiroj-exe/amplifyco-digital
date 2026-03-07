"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const GlobalImpact3D = dynamic(() => import("@/components/canvas/GlobalImpact3D"), {
  ssr: false,
});

export default function GlobalImpact() {
  return (
    <section className="py-32 relative bg-background overflow-hidden border-t border-white/5">
      {/* Heavy glow effect behind the 3D globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
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
            viewport={{ once: true }}
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

        {/* 3D Global Impact Visualizer */}
        <div className="w-full md:w-1/2 h-[500px] md:h-[600px] relative rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/5 rounded-full blur-3xl"></div>
          <GlobalImpact3D />
        </div>

      </div>
    </section>
  );
}
