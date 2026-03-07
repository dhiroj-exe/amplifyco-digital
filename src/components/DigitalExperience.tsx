"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const InteractiveScene3D = dynamic(() => import("@/components/canvas/InteractiveScene3D"), {
  ssr: false,
});

export default function DigitalExperience() {
  return (
    <section className="relative w-full h-screen min-h-[800px] bg-black overflow-hidden border-t border-white/5 flex items-center justify-center">
      {/* 3D Canvas Background filling the entire section */}
      <div className="absolute inset-0 z-0">
        <InteractiveScene3D />
      </div>

      {/* Pointer overlay to ensure users know they can interact */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      
      {/* Central typography */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6 pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300 tracking-widest uppercase">Immersive Technology</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl">
            Feel the Digital.
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Move your cursor. Interact with the environment. We don&apos;t build static pages—we engineer interactive digital worlds that captivate your audience.
          </p>
        </motion.div>
      </div>

      {/* Interactive prompt */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center p-1 mb-4 backdrop-blur-sm"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </motion.div>
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Play with the spheres</span>
      </div>
    </section>
  );
}
