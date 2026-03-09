"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery & Audit",
    description: "We dive deep into your brand's DNA, auditing your current digital footprint to extract the raw potential and identify exact market gaps.",
  },
  {
    num: "02",
    title: "Cinematic Strategy",
    description: "We don't guess. We architect a bespoke, data-driven blueprint that dictates how your brand will look, feel, and sound across the internet.",
  },
  {
    num: "03",
    title: "Immersive Creation",
    description: "Our studio teams execute the vision—crafting high-converting web environments and viral storytelling content that demands attention.",
  },
  {
    num: "04",
    title: "The Launch & Scale",
    description: "We deploy the ecosystem to the world. Watch as passive observers turn into an engaged, loyal community, scaling your legacy.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Animate the height of the glowing line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="pt-24 md:pt-48 pb-0 bg-[#020202] relative border-t border-white/5 overflow-hidden">
      
      {/* Subtle ambient noise texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Side: Sticky Intro */}
        <div className="w-full md:w-5/12">
          <div className="md:sticky md:top-48">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-3 mb-8">
                 <div className="w-8 h-[1px] bg-gray-500"></div>
                 <span className="text-xs font-mono uppercase tracking-[0.3em] text-gray-500">The Methodology</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 leading-[1.1]">
                How We Draft <br/> <span className="font-serif italic text-gray-400">History.</span>
              </h2>
              
              <p className="text-lg text-gray-400 font-light leading-relaxed max-w-sm">
                A meticulous, four-phase architecture designed to strip away the noise and elevate your brand to its highest aesthetic and functional potential.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: The Scrolling Journey */}
        <div className="w-full md:w-7/12 relative">
          
          {/* The Vertical Track (Hidden on mobile for cleaner look) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 ml-[4.5rem]">
             {/* The glowing progress line */}
             <motion.div 
               style={{ height: lineHeight }} 
               className="w-[2px] -ml-[0.5px] bg-gradient-to-b from-white via-gray-400 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]"
             />
          </div>

          <div className="flex flex-col gap-24 md:gap-40">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-12 group"
              >
                 {/* Step Number (Editorial Style) */}
                 <div className="hidden md:flex flex-col items-center shrink-0 w-24 relative z-10">
                   <div className="text-3xl font-light text-gray-700 transition-colors duration-500 group-hover:text-white bg-[#020202] py-2">
                     {step.num}
                   </div>
                 </div>

                 {/* Mobile Step Formatter */}
                 <div className="md:hidden text-2xl font-light text-gray-600 mb-2">
                    {step.num}
                 </div>

                 {/* Step Content */}
                 <div className="relative pt-2">
                   {/* Huge background number behind the text for premium depth */}
                   <div className="absolute -top-12 -left-8 text-[8rem] font-sans font-black text-white/5 select-none pointer-events-none tracking-tighter transition-all duration-700 group-hover:text-white/10 group-hover:-translate-y-4">
                     {step.num}
                   </div>
                   
                   <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6 relative z-10 group-hover:pl-4 transition-all duration-500">
                     {step.title}
                   </h3>
                   <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed relative z-10">
                     {step.description}
                   </p>
                 </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
