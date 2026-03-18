"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Coming Soon",
    category: "Case Study",
    color: "bg-gray-900/40",
    gradient: "from-gray-500/20 to-transparent"
  },
  {
    id: 2,
    title: "Coming Soon",
    category: "Case Study",
    color: "bg-gray-900/40",
    gradient: "from-gray-500/20 to-transparent"
  },
  {
    id: 3,
    title: "Coming Soon",
    category: "Case Study",
    color: "bg-gray-900/40",
    gradient: "from-gray-500/20 to-transparent"
  }
  // Space remaining to add new actual projects here later
  // {
  //   id: 4,
  //   title: "Client Project Name",
  //   category: "Website Development",
  //   color: "bg-blue-900/40",
  //   gradient: "from-blue-500/20 to-transparent"
  // }
];

const PortfolioCard = ({ project }: { project: Record<string, string | number> }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Increased intensity for dramatic 3D effect
    const rotateXValue = ((y - centerY) / centerY) * -20;
    const rotateYValue = ((x - centerX) / centerX) * 20;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        className={`relative w-[600px] h-[400px] shrink-0 rounded-3xl border border-white/10 overflow-hidden ${project.color} group cursor-pointer shadow-2xl`}
      >
        {/* Deep ambient background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>

        {/* Dynamic Glare Effect tied to rotation */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
            mixBlendMode: 'overlay'
          }}
        ></div>

        {/* Floating internal aesthetic UI mimicking abstract digital value */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8 transform-style-3d">
          <div
            className="w-full h-full border border-white/10 rounded-2xl flex flex-col bg-black/40 backdrop-blur-md transition-transform duration-300 ease-out shadow-[-10px_-10px_30px_rgba(255,255,255,0.05)_inset]"
            style={{ transform: `translateZ(40px)` }}
          >
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="w-1/3 h-6 bg-white/10 rounded-full mb-4 shadow-sm"></div>
              <div className="w-3/4 h-6 bg-white/10 rounded-full mb-12 shadow-sm"></div>

              <div className="mt-auto grid grid-cols-3 gap-6">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5"></div>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5"></div>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Copy layer floating highest in Z-space */}
        <div
          className="absolute bottom-6 left-6 z-10 pointer-events-none"
          style={{ transform: `translateZ(60px)` }}
        >
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-xl mb-3 inline-block shadow-lg">
            {project.category}
          </span>
          <h3 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">{project.title}</h3>
        </div>
      </motion.div>
    </div>
  );
};

export default function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-50%"]);

  return (
    <section ref={targetRef} className="h-[200vh] bg-[#0B0B0B] border-t border-white/5">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className="text-sm font-medium text-gray-300">Selected Case Studies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tighter"
          >
            Featured Work
          </motion.h2>
          <p className="text-gray-400 mt-6 text-xl max-w-2xl">Scroll down to explore how our strategies translate into stunning digital assets.</p>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-12 w-max pb-12 pt-8">
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
