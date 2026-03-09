"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Play, Sparkles, Layers } from "lucide-react";

const FlowingCanvas = dynamic(() => import("@/components/canvas/Network3D"), {
  ssr: false,
});

const elements = [
  {
    id: "cinematic",
    title: "Cinematic Design",
    description: "We don't build generic web pages. We craft immersive digital environments that leave a profound, lasting aesthetic impression on every visitor.",
    icon: Play,
    color: "from-blue-500/30 to-blue-900/0",
    borderGlow: "group-hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    delay: 0
  },
  {
    id: "viral",
    title: "Viral Strategy",
    description: "Raw, highly-produced content engineered specifically to arrest the doom-scroll, forge emotional narratives, and manufacture virality.",
    icon: Sparkles,
    color: "from-purple-500/30 to-purple-900/0",
    borderGlow: "group-hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]",
    delay: 0.2
  },
  {
    id: "architecture",
    title: "Enduring Architecture",
    description: "Data-driven systems that don't just chase immediate conversions, but meticulously construct long-term market dominance and scalability.",
    icon: Layers,
    color: "from-indigo-500/30 to-indigo-900/0",
    borderGlow: "group-hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]",
    delay: 0.4
  }
];

// Interactive 3D Card for Desktop only
function ElementCardDesktop({ el }: { el: typeof elements[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, z: -200 }}
      whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: el.delay, type: "spring", stiffness: 50 }}
      className="perspective-1000 w-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative flex flex-col items-center text-center p-10 lg:p-14 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md cursor-crosshair transition-colors duration-700 ease-out hover:bg-black/80 ${el.borderGlow} shadow-2xl overflow-hidden h-full`}
      >
        <div style={{ transform: "translateZ(40px)" }} className="relative z-20 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
            <el.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={1.5} />
          </div>
          <h3 className="text-3xl font-light tracking-tight text-white mb-6">
            {el.title}
          </h3>
          <p className="text-gray-400 font-light leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-500">
            {el.description}
          </p>
        </div>
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform(() => `radial-gradient(circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.1) 0%, transparent 60%)`),
          }}
        />
        <div className="w-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:w-full transition-all duration-700 ease-out absolute bottom-0 left-0 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

// Mobile-Optimized Premium Card (No 3D tracking, fast CSS animations)
function ElementCardMobile({ el, index }: { el: typeof elements[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      className="w-full relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-black/40 border border-white/10 overflow-hidden shadow-2xl"
    >
       {/* Ambient glow pulses softly */}
       <motion.div 
         className={`absolute inset-0 bg-gradient-to-t ${el.color} opacity-20 pointer-events-none`}
         animate={{ opacity: [0.1, 0.3, 0.1] }}
         transition={{ duration: 4, repeat: Infinity, delay: index }}
       />

       {/* Icon */}
       <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
         <el.icon className="w-5 h-5 text-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
       </div>

       <h3 className="text-2xl font-light tracking-tight text-white mb-4 relative z-10">
         {el.title}
       </h3>
       
       <p className="text-gray-400 font-light leading-relaxed text-sm relative z-10">
         {el.description}
       </p>
       
       {/* Top Border Accent */}
       <div className="w-1/3 h-[1px] bg-white/30 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
    </motion.div>
  );
}

export default function GlobalImpact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Shared scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Desktop specific transforms (Dramatic perspective portal)
  const scaleDesktop = useTransform(smoothProgress, [0, 1], [0.8, 1]);
  const rotateXDesktop = useTransform(smoothProgress, [0, 1], ["20deg", "0deg"]);
  const opacityDesktop = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  // Mobile specific transforms (Smooth fade up without perspective clipping)
  const opacityMobile = useTransform(smoothProgress, [0.1, 0.5], [0, 1]);
  const yMobile = useTransform(smoothProgress, [0.1, 0.5], [50, 0]);

  return (
    <section ref={containerRef} className="pt-0 pb-32 md:pb-48 relative bg-black overflow-hidden min-h-[120vh]">

      {/* --- BACKGROUNDS --- */}

      {/* MOBILE PERFORMANCE BACKGROUND (CSS ONLY) */}
      {mounted && isMobile && (
        <div className="absolute inset-0 z-0 overflow-hidden md:hidden">
          <div className="absolute inset-0 bg-[#020202]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay z-10"></div>
          
          <motion.div 
              className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full"
              animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
              className="absolute top-1/2 -right-32 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full"
              animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      )}

      {/* DESKTOP 3D KINETIC BACKGROUND */}
      {mounted && !isMobile && (
        <div className="hidden md:block absolute inset-0 z-0">
          <FlowingCanvas />
        </div>
      )}

      {/* Atmospheric Vignette Shared */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 pointer-events-none opacity-90 md:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none opacity-60 md:opacity-80" />


      {/* --- CONTENT CONTAINERS --- */}

      {/* MOBILE CONTENT CONTAINER (No preserve-3d to save battery/FPS) */}
      <motion.div
        style={{ opacity: opacityMobile, y: yMobile }}
        className="md:hidden relative z-20 h-full flex flex-col pt-32 px-6 max-w-lg mx-auto"
      >
        {/* Mobile Header */}
        <div className="w-full text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">Initiate Sequence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-sans font-light tracking-tighter text-white mb-6 leading-[1]">
            Absolute <br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500">Dominance.</span>
          </h2>
        </div>

        {/* Mobile Cards Array */}
        <div className="flex flex-col gap-6 relative w-full pb-16">
          {elements.map((el, idx) => (
            <ElementCardMobile key={el.id} el={el} index={idx} />
          ))}
        </div>
      </motion.div>


      {/* DESKTOP CONTENT CONTAINER (Preserves full 3D layout, laser, and interactions) */}
      <motion.div
        style={{ scale: scaleDesktop, rotateX: rotateXDesktop, opacity: opacityDesktop, transformStyle: "preserve-3d" }}
        className="hidden md:flex max-w-7xl mx-auto px-12 relative z-20 h-full flex-col pt-48 perspective-1000"
      >
        {/* Desktop Header */}
        <div className="w-full text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center justify-center gap-4 mb-8">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span className="text-sm font-mono tracking-[0.4em] uppercase text-white/50">Initiate Sequence</span>
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            </div>
            
            <h2 className="text-7xl lg:text-[100px] font-sans font-light tracking-tighter text-white mb-8 leading-[0.9]">
              Absolute <br />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500">Dominance.</span>
            </h2>
          </motion.div>
        </div>

        {/* Desktop 3D Cards */}
        <div className="grid grid-cols-3 gap-12 relative w-full perspective-1000">
          {elements.map((el) => (
            <ElementCardDesktop key={el.id} el={el} />
          ))}
        </div>
      </motion.div>

    </section>
  );
}
