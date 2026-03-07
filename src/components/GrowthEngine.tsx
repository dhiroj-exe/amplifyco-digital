"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const GrowthEngine3D = dynamic(() => import("@/components/canvas/GrowthEngine3D"), {
  ssr: false,
});

export default function GrowthEngine() {
  return (
    <section className="relative w-full h-screen min-h-[800px] bg-[#050505] overflow-hidden border-t border-white/5 flex items-center justify-center">
      {/* 3D Canvas Background filling the entire section */}
      <div className="absolute inset-0 z-0">
        <GrowthEngine3D />
      </div>

      {/* Subtle overlays to frame the typography */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>
      
      {/* Central typography */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6 pointer-events-none -translate-y-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300 tracking-widest uppercase">Our Network</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 drop-shadow-2xl">
            Connect <br/> With Us.
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Interact with the ecosystem. Click the floating 3D icons to explore our presence across social platforms and see our growth strategies in action.
          </p>
        </motion.div>
      </div>

      {/* Premium Minimal Data Cards */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute left-[10%] top-[30%] z-10 w-52 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col justify-center px-6 pointer-events-none shadow-2xl"
      >
         <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Qualified Traffic</div>
         <div className="text-2xl text-white font-bold tracking-tight">1.2M+</div>
         <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/40 to-transparent rounded-r-2xl"></div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute right-[10%] top-[40%] z-10 w-52 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col justify-center px-6 pointer-events-none shadow-2xl"
      >
         <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Avg. Conversion</div>
         <div className="text-2xl text-white font-bold tracking-tight">8.4%</div>
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/40 to-transparent rounded-l-2xl"></div>
      </motion.div>

      {/* Interactive prompt */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <motion.div 
          animate={{ x: [-10, 10, -10] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex gap-2 mb-4 backdrop-blur-sm bg-black/40 px-6 py-3 rounded-full border border-white/10"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </motion.div>
        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium drop-shadow-md">Click Apps to Open</span>
      </div>
    </section>
  );
}
