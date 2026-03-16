"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const services = [
  {
    id: "web",
    number: "01",
    title: "Cinematic Web Architecture",
    tagline: "Performance meets pure art.",
    description: "We forge digital ecosystems that perform as beautifully as they look. Immersive 3D, buttery smooth interactions, and heavy conversion architecture.",
    color: "#3b82f6",
  },
  {
    id: "content",
    number: "02",
    title: "Viral Storytelling",
    tagline: "Arrest the scroll. Capture the mind.",
    description: "Raw, highly-produced content engineered specifically to arrest the doom-scroll. We manufacture virality and build deep emotional narratives.",
    color: "#a855f7",
  },
  {
    id: "social",
    number: "03",
    title: "Social Cultivation",
    tagline: "Rabid communities, not followers.",
    description: "Corporate, sanitized social media is dead. We build radical, authentic movements that actively fight for your brand.",
    color: "#6366f1",
  },
  {
    id: "strategy",
    number: "04",
    title: "Market Domination",
    tagline: "Surgical math. Relentless growth.",
    description: "We deploy surgical ad strategies, relentless A/B testing, and full-funnel tracking to ensure every dollar multiplies aggressively.",
    color: "#10b981",
  }
];

export default function Services() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionIndex = Math.min(Math.floor(latest * services.length), services.length - 1);
    if (sectionIndex !== activeIndex) {
      setActiveIndex(sectionIndex);
    }
  });

  const spotlightX = useTransform(scrollYProgress, [0, 1], ["20%", "80%"]);
  const spotlightY = useTransform(scrollYProgress, [0, 1], ["30%", "70%"]);

  return (
    <section ref={containerRef} id="capabilities" className={`relative w-full bg-[#000] ${isMobile ? 'h-auto py-24' : 'h-[400vh]'}`}>
      <div className={`${isMobile ? 'relative' : 'sticky top-0 h-screen'} w-full flex items-center justify-center overflow-hidden`}>
        
        {/* Dynamic Cinematic Spotlight - Disabled on Mobile */}
        {!isMobile && (
          <motion.div 
            style={{ 
              left: spotlightX, 
              top: spotlightY,
              background: `radial-gradient(circle at center, ${services[activeIndex].color}15 0%, transparent 70%)`
            }}
            className="absolute w-[100vw] h-[100vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-[120px] z-0 transition-colors duration-1000"
          />
        )}

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-24 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-12 items-center">
            
            {/* Left: Huge Background Numbers & Section Tag - Hidden on Mobile */}
            {!isMobile && (
              <div className="lg:col-span-4 flex flex-col justify-center h-full">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8"
                >
                  <span className="text-xs font-mono uppercase tracking-[0.5em] text-white/40 mb-4 block">Capabilites / Radical Execution</span>
                  <h2 className="text-2xl font-light text-white/20 tracking-widest uppercase">The Impact</h2>
                </motion.div>

                <div className="relative h-[300px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeIndex}
                      initial={{ opacity: 0, y: 100, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -100, rotateX: -90 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[20rem] md:text-[30rem] font-bold text-white/5 leading-none select-none pointer-events-none font-serif italic"
                    >
                      0{activeIndex + 1}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Right: The Typographic Monolith / Mobile Layout */}
            <div className={`${isMobile ? 'col-span-1 space-y-24' : 'lg:col-span-8'} flex flex-col justify-center`}>
              {isMobile ? (
                services.map((service, index) => (
                  <div key={service.id} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-blue-500">0{index + 1}</span>
                      <span className="h-[1px] w-12 bg-white/10" />
                      <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">{service.tagline}</span>
                    </div>
                    <h3 className="text-4xl font-bold tracking-tight text-white leading-[1.1]">
                      {service.title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 !== 0 ? "italic font-serif font-light text-gray-500/80 inline ml-2" : "inline"}>
                          {word}
                        </span>
                      ))}
                    </h3>
                    <p className="text-lg text-gray-400 font-light leading-relaxed">
                      {service.description}
                    </p>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-2 text-lg font-medium text-white border-b border-white/20 pb-1"
                    >
                      Begin Your Legacy <ArrowUpRight className="w-5 h-5 text-blue-500" />
                    </Link>
                  </div>
                ))
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-6">
                      <span className="h-[1px] w-24 bg-white/20" />
                      <span className="text-sm font-mono tracking-[0.3em] text-blue-400 uppercase">{services[activeIndex].tagline}</span>
                    </div>

                    <h3 className="text-6xl md:text-[9rem] font-bold tracking-tight text-white leading-[0.9] max-w-4xl">
                      {services[activeIndex].title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 !== 0 ? "italic font-serif font-light text-gray-500/80 block" : "block"}>
                          {word}
                        </span>
                      ))}
                    </h3>

                    <div className="max-w-xl">
                      <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10">
                        {services[activeIndex].description}
                      </p>

                      <Link 
                        href="/contact" 
                        className="group relative inline-flex items-center gap-4 text-2xl font-medium text-white transition-all hover:gap-8"
                      >
                        <span className="relative">
                          Begin Your Legacy
                          <motion.span 
                            className="absolute bottom-[-8px] left-0 h-[1px] bg-white w-full origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                          />
                        </span>
                        <ArrowUpRight className="w-8 h-8 text-blue-500 transition-transform group-hover:rotate-45" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* Cinematic Scrubber Navigation - Hidden on Mobile */}
        {!isMobile && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20">
            {services.map((_, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => {
                const target = (index / (services.length - 1)) * (containerRef.current?.scrollHeight || 0);
                window.scrollTo({ top: target, behavior: "smooth" });
              }}>
                <motion.div 
                  animate={{ 
                    height: activeIndex === index ? 40 : 8,
                    backgroundColor: activeIndex === index ? "#fff" : "rgba(255,255,255,0.2)" 
                  }}
                  className="w-[2px] rounded-full transition-all duration-500"
                />
                <span className={`absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-mono whitespace-nowrap transition-all duration-500 ${activeIndex === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
