"use client";

import React, { useRef } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Target, Zap, ChevronRight, ShieldCheck, Layers, ArrowUpRight, X } from "lucide-react";
import Link from "next/link";

type PackageData = {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  goal: string;
  highlight: boolean;
  cta: string;
};

const Interactive3DCard = ({ pkg }: { pkg: PackageData }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="perspective-[2000px] w-full max-w-lg mx-auto lg:mx-0"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        className="relative w-full rounded-[40px] bg-[#0a0a0a] border border-white/10 p-10 md:p-14 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] z-20 group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-[40px] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03] rounded-[40px] pointer-events-none" />
        
        {/* Glowing floating orb */}
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 blur-[60px] rounded-full pointer-events-none"
          style={{ transform: "translateZ(80px)" }}
        />

        <div className="relative z-10" style={{ transform: "translateZ(60px)" }}>
           {pkg.highlight && (
             <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full mb-8 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
               <Sparkles className="w-4 h-4" /> Most Popular
             </div>
           )}
           
           <div className="text-sm font-black tracking-widest text-gray-400 uppercase mb-2">Investment</div>
           <div className="flex items-end gap-2 mb-8">
             <div className="text-5xl md:text-7xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">
                {pkg.price}
             </div>
             {pkg.period && (
               <div className="text-xl text-gray-500 font-bold mb-2 md:mb-3">{pkg.period}</div>
             )}
           </div>

           <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent my-8" />

           <div className="text-gray-300 text-lg leading-relaxed font-medium mb-12">
             {pkg.description}
           </div>

           <Link 
             href={`/contact?package=${pkg.id}`}
             className="relative flex items-center justify-center w-full h-16 rounded-2xl bg-white text-black text-lg font-black uppercase tracking-wider overflow-hidden group/btn hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
             style={{ transform: "translateZ(40px)" }}
           >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">Initiate Sequence <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></span>
           </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function PackageDetailClient({ pkg }: { pkg: PackageData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeFeature, setActiveFeature] = React.useState<{id: string, title: string, isHighlight: boolean} | null>(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative selection:bg-indigo-500/30 text-white pb-40">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent z-50 brightness-200" />
      
      {/* Navbar spacer */}
      <div className="h-32" />

      {/* Main Grid Wrapper */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* LEFT COLUMN: Deep Content */}
        <div className="lg:col-span-7 pt-10">
           <Link href="/pricing" className="group inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-white transition-colors mb-16">
             <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/5 transition-all">
                <ArrowRight className="w-4 h-4 rotate-180" /> 
             </div>
             Back to Core Packages
           </Link>

           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-none drop-shadow-2xl">
               <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                 {pkg.name.split(' ').map((word: string, i: number, arr: string[]) => i === arr.length - 1 ? <span key={i} className="text-indigo-400">{word}</span> : word + ' ' )}
               </span>
             </h1>

             <div className="inline-flex items-center gap-3 p-1 pr-6 rounded-full bg-white/5 border border-white/10 mb-20 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Target className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-sm font-bold tracking-widest text-gray-300 uppercase">Primary Goal: <span className="text-white">{pkg.goal}</span></span>
             </div>
           </motion.div>

           {/* FEATURES GRID */}
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             className="mb-32 relative"
           >
             <h3 className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight flex items-center gap-4">
               <Zap className="w-8 h-8 text-indigo-400" /> What&apos;s Included
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {pkg.features.map((feature: string, i: number) => {
                 const isHighlight = feature.startsWith('✔');
                 const cleanFeature = feature.replace('✔ ', '');
                 const featureId = `feature-${i}-${pkg.id}`;

                 return (
                   <motion.div 
                     layoutId={featureId}
                     key={i}
                     onClick={() => setActiveFeature({ id: featureId, title: cleanFeature, isHighlight })}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.05 }}
                     className={`group relative p-6 rounded-3xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                       isHighlight 
                         ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]' 
                         : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)]'
                     }`}
                   >
                     {isHighlight && (
                       <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/20 blur-[20px] rounded-full pointer-events-none group-hover:bg-emerald-500/40 transition-colors" />
                     )}
                     <div className="flex flex-col gap-4 relative z-10">
                       <motion.div layoutId={`icon-${featureId}`} className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                         isHighlight ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30'
                       } transition-colors duration-300`}>
                         {isHighlight ? <ShieldCheck className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                       </motion.div>
                       <motion.span layoutId={`title-${featureId}`} className={`text-lg font-medium pr-6 ${isHighlight ? 'text-emerald-50' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
                         {cleanFeature}
                       </motion.span>
                     </div>
                     <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                     </div>
                   </motion.div>
                 );
               })}
             </div>
           </motion.div>

           {/* VERTICAL STEPPER TIMELINE */}
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-20"
           >
             <h3 className="text-3xl md:text-4xl font-black text-white mb-16 tracking-tight flex items-center gap-4">
               <ChevronRight className="w-8 h-8 text-indigo-400" /> Timeline & Process
             </h3>
             <div className="relative pl-8 md:pl-0">
               {/* Vertical Line */}
               <div className="absolute left-8 md:left-[39px] top-0 bottom-0 w-[2px] bg-white/5" />
               <motion.div 
                  className="absolute left-8 md:left-[39px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent origin-top"
                  style={{ scaleY: scrollYProgress }}
               />

               {[
                 { title: "Discovery & Alignment", desc: "A rigorous strategy session to tear down your goals, analyze your competitors, and align perfectly on your brand voice." },
                 { title: "Architectural Planning", desc: "We map out the exact blueprint. From content calendars to wireframes, everything is precision-engineered before execution." },
                 { title: "Execution & Deployment", desc: "Our team builds the assets. You receive high-fidelity previews, revisions, and a seamless deployment into the market." }
               ].map((step, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.5, delay: i * 0.2 }}
                   className="relative flex md:contents group"
                 >
                   <div className="md:w-1/2 md:pr-12 md:text-right hidden md:block">
                     {/* Left side spacer on desktop */}
                   </div>
                   
                   <div className="absolute left-[-32px] md:static md:w-[80px] flex justify-center mt-1.5 md:mt-0 z-10">
                     <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black border-2 border-white/20 flex items-center justify-center font-bold text-gray-500 group-hover:border-indigo-400 group-hover:text-indigo-400 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 bg-black">
                       {i + 1}
                     </div>
                   </div>

                   <div className="pb-16 md:w-1/2 pl-6 md:pl-12">
                     <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{step.title}</h4>
                     <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
           </motion.div>
        </div>

        {/* RIGHT COLUMN: Sticky 3D Hero Card */}
        <div className="lg:col-span-5 relative">
           <div className="sticky top-40 pt-10">
              <Interactive3DCard pkg={pkg} />
           </div>
        </div>

      </div>

      {/* EXPANDED FEATURE MODAL */}
      <AnimatePresence>
        {activeFeature && (
          <FeatureModal 
             feature={activeFeature} 
             onClose={() => setActiveFeature(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}

function FeatureModal({ feature, onClose }: { feature: { id: string, title: string, isHighlight: boolean }, onClose: () => void }) {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md cursor-pointer"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-12">
        <motion.div 
          layoutId={feature.id}
          className={`relative w-full max-w-2xl pointer-events-auto overflow-hidden rounded-[40px] border shadow-2xl p-8 md:p-12 ${
            feature.isHighlight 
              ? 'bg-[#0a1510] border-emerald-500/30' 
              : 'bg-[#111] border-white/10'
          }`}
        >
          {feature.isHighlight && (
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
          )}
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors z-20 group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          <div className="relative z-10 flex flex-col gap-6">
            <motion.div 
              layoutId={`icon-${feature.id}`} 
              className={`w-16 h-16 rounded-full flex items-center justify-center border ${
                feature.isHighlight ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-400'
              }`}
            >
              {feature.isHighlight ? <ShieldCheck className="w-8 h-8" /> : <Layers className="w-8 h-8" />}
            </motion.div>
            
            <motion.h2 
              layoutId={`title-${feature.id}`} 
              className={`text-3xl md:text-5xl font-black tracking-tight ${feature.isHighlight ? 'text-emerald-50' : 'text-white'}`}
            >
              {feature.title}
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="h-[1px] w-1/4 bg-white/10 my-4"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed font-medium"
            >
              Every aspect of <span className="text-white">{feature.title}</span> is meticulously executed to ensure maximum performance. We don&apos;t just check boxes—we design the infrastructure that allows your brand to scale aggressively and absolutely dominate your vertical.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest">
                 <Zap className="w-4 h-4 text-indigo-400" /> Premium Standard Included
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
