"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// The premium services focused on "memories" and "legacy"
const showcases = [
  {
    id: "cinematic",
    title: "Cinematic Web Experience",
    description: "We don't just build websites. We craft immersive digital environments that leave a profound, lasting impression on every visitor.",
    gradient: "from-blue-900/40 via-black to-black",
    glow: "bg-blue-500/20"
  },
  {
    id: "viral",
    title: "Viral Storytelling",
    description: "Short-form content designed not just for views, but to forge emotional connections that embed your brand into culture.",
    gradient: "from-purple-900/40 via-black to-black",
    glow: "bg-purple-500/20"
  },
  {
    id: "social",
    title: "Authentic Communities",
    description: "Social media strategies that strip away the corporate noise, cultivating genuine loyalty and turning followers into advocates.",
    gradient: "from-indigo-900/40 via-black to-black",
    glow: "bg-indigo-500/20"
  },
  {
    id: "legacy",
    title: "Enduring Strategy",
    description: "Data-driven architectures that don't just chase immediate conversions, but meticulously construct long-term market dominance.",
    gradient: "from-emerald-900/40 via-black to-black",
    glow: "bg-emerald-500/20"
  }
];

export default function PremiumShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Default gradient when nothing is hovered

  
  // Find active showcase for background transitioning
  const activeShowcase = showcases.find(s => s.id === hoveredId);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#000] overflow-hidden border-t border-white/5 py-32">
       
       {/* Smooth Background Transition Layer */}
       <AnimatePresence>
          {activeShowcase && (
            <motion.div
              key={activeShowcase.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className={`absolute inset-0 bg-gradient-to-b ${activeShowcase.gradient} pointer-events-none z-0`}
            />
          )}
       </AnimatePresence>

       {/* Subdued ambient glow tracking the active item */}
       <AnimatePresence>
          {activeShowcase && (
            <motion.div
              key={`glow-${activeShowcase.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] ${activeShowcase.glow} pointer-events-none z-0 mix-blend-screen opacity-50`}
            />
          )}
       </AnimatePresence>

       {/* Moving Abstract Floating Orb behind the text list */}
       <AnimatePresence>
         {activeShowcase && (
           <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 0.4, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
              className={`absolute right-10 top-1/2 -translate-y-1/2 w-[400px] h-[600px] blur-[80px] rounded-[100%] ${activeShowcase.glow} pointer-events-none z-0 rotate-12`}
           />
         )}
       </AnimatePresence>

       {/* Grain Overlay for Cinematic Texture */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
          
          <div className="flex flex-col md:flex-row gap-16 lg:gap-32 h-full">
            
            {/* Left Column: Emotion / Intro */}
            <div className="w-full md:w-5/12 flex flex-col justify-center">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               >
                 <p className="text-sm font-light tracking-[0.2em] uppercase text-gray-500 mb-6">AmplifyCO Digital</p>
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-8 leading-[1.1]">
                   We don&apos;t build funnels.<br />
                   <span className="font-serif italic text-gray-400">We craft legacies.</span>
                 </h2>
                 <p className="text-lg text-gray-400 font-light leading-relaxed max-w-md mb-12">
                   Your brand deserves more than transient clicks. It requires an immersive digital narrative that embeds itself in the memories of your audience.
                 </p>

                 <div className="mt-auto">
                    <Link href="/contact" className="group inline-flex items-center gap-4 text-white pb-2 border-b border-white/20 hover:border-white transition-colors duration-500">
                      <span className="text-sm tracking-widest uppercase font-medium">Begin Your Legacy</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                    </Link>
                 </div>
               </motion.div>
            </div>

            {/* Right Column: The Hover List */}
            <div className="w-full md:w-7/12 flex flex-col justify-center relative">
               
               <div className="flex flex-col gap-0 border-t border-white/10">
                 {showcases.map((showcase, index) => (
                   <motion.div
                     key={showcase.id}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: index * 0.1 }}
                     onMouseEnter={() => setHoveredId(showcase.id)}
                     onMouseLeave={() => setHoveredId(null)}
                     className="group relative py-8 border-b border-white/10 cursor-pointer overflow-hidden"
                   >
                     {/* The animated underline on hover */}
                     <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out z-20"></div>

                     <div className="flex flex-col relative z-20">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-mono text-gray-600 transition-colors duration-500 group-hover:text-white">0{index + 1}</span>
                           <ArrowUpRight className="w-5 h-5 text-gray-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                        </div>
                        
                        {/* Title scales slightly and changes color on hover */}
                        <h3 className="text-3xl md:text-5xl font-light tracking-tight text-gray-500 transition-all duration-700 group-hover:text-white group-hover:translate-x-6">
                          {showcase.title}
                        </h3>

                        {/* Description reveals smoothly on hover */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out">
                          <div className="overflow-hidden">
                             <p className="pt-6 text-gray-300 font-light text-lg leading-relaxed max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200 pl-6 border-l border-white/20">
                               {showcase.description}
                             </p>
                          </div>
                        </div>
                     </div>
                   </motion.div>
                 ))}
               </div>

            </div>
          </div>
       </div>
    </section>
  );
}
