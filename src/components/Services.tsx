"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "web",
    title: "Cinematic Web Architecture",
    description: "We forge digital ecosystems that perform as beautifully as they look. Immersive 3D, buttery smooth interactions, and heavy conversion architecture. Your website isn't a brochure, it's a flagship luxury store.",
    color: "#3b82f6", // Blue
    gradientRadius: "150%",
    path: "M43.5,-75.4C55.6,-68.8,64.2,-55.8,71.1,-42.2C78,-28.7,83.1,-14.3,81.4,-1C79.7,12.3,71.1,24.6,63.4,36.5C55.7,48.4,48.9,59.9,38.8,67.6C28.7,75.3,15.3,79.2,-0.1,79.3C-15.4,79.5,-30.8,75.9,-44.1,68.6C-57.4,61.3,-68.6,50.3,-75.7,37.3C-82.8,24.3,-85.8,9.3,-84.3,-5C-82.8,-19.3,-76.8,-32.9,-68.1,-44.6C-59.4,-56.3,-48,-66.1,-35.1,-72.2C-22.2,-78.3,-7.8,-80.7,6.4,-82.9C20.6,-85.1,31.4,-82,43.5,-75.4Z"
  },
  {
    id: "content",
    title: "Viral Storytelling",
    description: "Raw, highly-produced content engineered specifically to arrest the doom-scroll. We manufacture virality, build deep emotional narratives, and turn passing glances into fervent brand advocates.",
    color: "#a855f7", // Purple
    gradientRadius: "130%",
    path: "M36.3,-62.4C49,-54.9,62.7,-49.2,69.5,-39C76.3,-28.8,76.2,-14.4,76.4,0.1C76.6,14.6,77.1,29.2,71,41.4C64.9,53.6,52.2,63.4,38.9,68.9C25.6,74.4,11.8,75.6,-1.3,77.8C-14.4,80,-26.8,83.2,-39.8,79.7C-52.8,76.2,-66.4,66.1,-74.6,52.8C-82.8,39.5,-85.6,23,-83.4,7.8C-81.2,-7.4,-74,-21.3,-65.4,-33.5C-56.8,-45.7,-46.8,-56.2,-34.8,-63.9C-22.8,-71.6,-8.8,-76.5,2.6,-80.8C14,-85.1,23.6,-69.9,36.3,-62.4Z"
  },
  {
    id: "social",
    title: "Social Cultivation",
    description: "Corporate, sanitized social media is dead. We build radical, authentic movements. We manage your presence 24/7, fostering a rabid community that actively fights for your brand.",
    color: "#6366f1", // Indigo
    gradientRadius: "160%",
    path: "M43.1,-71.3C56,-65.4,66.7,-53.8,71.2,-40.4C75.7,-27,74,-13.5,73,0.1C72,13.7,71.7,27.5,65.8,38.4C59.9,49.3,48.4,57.3,36.5,64.4C24.6,71.5,12.3,77.7,-1,79.4C-14.3,81.1,-28.6,78.3,-41.2,71.4C-53.8,64.5,-64.7,53.5,-73.4,40.4C-82.1,27.3,-88.6,12.1,-87.3,-2.3C-86,-16.7,-76.9,-30.3,-65.9,-40.8C-54.9,-51.3,-42,-58.7,-29.3,-64.7C-16.6,-70.7,-4.1,-75.3,8.7,-74.7C21.5,-74.1,30.2,-77.2,43.1,-71.3Z"
  },
  {
    id: "strategy",
    title: "Market Domination",
    description: "Art means nothing without math. We deploy surgical ad strategies, relentless A/B testing, and full-funnel tracking to ensure every dollar you spend multiplies aggressively in the real world.",
    color: "#10b981", // Emerald
    gradientRadius: "140%",
    path: "M55.8,-66.2C70.3,-58.5,80.1,-41.8,81.5,-25C82.9,-8.2,75.9,8.8,66.9,23.8C57.9,38.8,46.9,51.8,32.8,60.6C18.7,69.4,1.5,74,-13.9,70.9C-29.3,67.8,-42.9,57,-53.4,44.2C-63.9,31.4,-71.3,16.6,-73,-0.5C-74.7,-17.6,-70.7,-37,-59.6,-50C-48.5,-63,-30.3,-69.6,-13.4,-67.2C3.5,-64.8,24,-53.4,41.3,-73.9Z"
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  
  // Reference for tracking scroll progress
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamically calculate the active service based on scroll percentage
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
     if (latest < 0.25) setActiveIndex(0);
     else if (latest >= 0.25 && latest < 0.50) setActiveIndex(1);
     else if (latest >= 0.50 && latest < 0.75) setActiveIndex(2);
     else if (latest >= 0.75) setActiveIndex(3);
  });

  return (
    <section ref={containerRef} id="capabilities" className="relative w-full bg-[#000] h-auto md:h-[400vh] border-t border-white/5">
      
      {/* Pinned Stage that stays in the viewport */}
      <div className="relative md:sticky top-0 min-h-[100dvh] md:h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-0">
        
        {/* Background Cinematic Grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

        {/* The Liquid Morphing Core (Background Stage) */}
        <div className="absolute inset-0 flex items-center justify-center mix-blend-screen pointer-events-none opacity-60">
          
          {/* Massive Ambient Glow that changes color */}
          <motion.div
             animate={{ 
               backgroundColor: activeService.color,
               scale: [1, 1.1, 1],
             }}
             transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
             className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          />

          {/* The Core SVG Blob */}
          <div className="relative w-[120vw] h-[120vw] md:w-[800px] md:h-[800px] flex items-center justify-center">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full transform scale-150 rotate-90 md:rotate-0 opacity-40">
              <defs>
                <radialGradient id="liquidGrad" cx="50%" cy="50%" rx="50%" ry="50%">
                  <stop offset="0%" stopColor={activeService.color} stopOpacity="1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <motion.path
                 fill="url(#liquidGrad)"
                 transform="translate(100 100)"
                 animate={{ d: activeService.path }}
                 transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

        </div>

        {/* Foreground Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-20 flex flex-col md:flex-row gap-16 md:gap-24 items-center">
           
           {/* Left Side: The Interactive Menu & Titles */}
           <div className="w-full md:w-5/12 flex flex-col justify-center">
              
              <div className="mb-16">
                <div className="inline-flex items-center gap-3 mb-6">
                   <div className="w-8 h-[1px] bg-white/40"></div>
                   <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">Our Capabilities</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-[1.1]">
                  Radical <br/> <span className="font-serif italic text-white/50">Execution.</span>
                </h2>
              </div>

              {/* The Minimalist Menu */}
              <div className="flex flex-col gap-6 relative">
                 
                 {/* Animated active indicator line */}
                 <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block">
                    <motion.div 
                       className="absolute w-1 -ml-[1.5px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                       animate={{ 
                         height: "2rem",
                         top: `calc(${activeIndex * 25}% + 8px)`
                       }}
                       transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                 </div>

                 {services.map((service, index) => {
                   const isActive = index === activeIndex;
                   return (
                     <button
                       key={service.id}
                       onClick={() => setActiveIndex(index)}
                       className={`text-left md:pl-8 py-2 transition-all duration-500 overflow-hidden relative group`}
                     >
                       <motion.div 
                          className="md:hidden absolute bottom-0 left-0 h-[1px] bg-white"
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? "100%" : 0 }}
                          transition={{ duration: 0.5 }}
                       />

                       <span className={`text-2xl md:text-3xl lg:text-4xl font-light tracking-tight transition-all duration-700
                          ${isActive ? "text-white translate-x-4 md:translate-x-6" : "text-white/30 group-hover:text-white/60"}
                       `}>
                         {service.title}
                       </span>
                     </button>
                   );
                 })}
              </div>

           </div>

           {/* Right Side: The Cinematic Data Panel */}
           <div className="w-full md:w-7/12 min-h-[400px] flex items-center relative">
              
              <AnimatePresence mode="wait">
                   <motion.div
                     key={activeService.id}
                     initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", x: 20 }}
                     animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }}
                     exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", x: -20 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[20px_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden w-full"
                   >
                     
                     {/* Internal Ambient Lighting */}
                     <div 
                       className="absolute -top-32 -right-32 w-64 h-64 blur-[80px] rounded-full opacity-30 pointer-events-none transition-colors duration-1000"
                       style={{ backgroundColor: activeService.color }}
                     />

                     <span className="text-xl font-mono tracking-widest leading-none mb-12 block transition-colors duration-1000" style={{ color: activeService.color }}>
                       0{activeIndex + 1}
                     </span>
                     
                     {/* Description block */}
                     <div className="min-h-[120px] mb-12">
                       <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                         {activeService.description}
                       </p>
                     </div>

                     {/* The Exploded Button */}
                     <Link href={`/services/${activeService.id}`} className="group relative overflow-hidden rounded-full inline-flex w-full sm:w-auto p-[1px]">
                         <span 
                           className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite]" 
                           style={{ backgroundImage: `conic-gradient(from 90deg at 50% 50%, ${activeService.color} 0%, transparent 50%)`, opacity: 0.8 }}
                         />
                         <div className="relative flex items-center justify-center gap-4 px-10 py-5 bg-black/80 backdrop-blur-xl rounded-full text-white font-medium tracking-wide uppercase text-sm hover:bg-black/40 transition-colors duration-500 w-full">
                            Initiate Strategy
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                         </div>
                      </Link>

                   </motion.div>
              </AnimatePresence>
           </div>     

        </div>
      </div>
    </section>
  );
}
