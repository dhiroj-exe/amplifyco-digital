"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, Video, Share2, TrendingUp } from "lucide-react";
import React, { useRef, useState } from "react";

const services = [
  {
    title: "Website Development",
    description: "High-converting, lightning-fast websites built with modern frameworks to capture leads and showcase your brand.",
    icon: MonitorSmartphone,
    color: "from-blue-500/20 to-indigo-500/5",
  },
  {
    title: "Reels Creation",
    description: "Engaging, high-quality short-form video content designed to go viral and build an audience on Instagram & TikTok.",
    icon: Video,
    color: "from-purple-500/20 to-pink-500/5",
  },
  {
    title: "Social Media Content",
    description: "Consistent, on-brand graphics and posts that build trust and keep your audience engaged daily.",
    icon: Share2,
    color: "from-emerald-500/20 to-teal-500/5",
  },
  {
    title: "Digital Marketing Strategy",
    description: "Data-driven advertising campaigns, SEO, and growth strategies to consistently generate qualified leads.",
    icon: TrendingUp,
    color: "from-orange-500/20 to-amber-500/5",
  },
];

const TiltCard = ({ service, index }: { service: Record<string, any>; index: number }) => {
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
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className={`relative p-8 rounded-2xl bg-[#111111] border border-white/5 overflow-hidden group cursor-pointer h-full`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative z-10 text-white">
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <service.icon className="w-6 h-6 text-gray-300" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight mb-4">{service.title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">{service.description}</p>
      </div>
      
      {/* Decorative reflection line */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
          >
            Capabilities & Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We provide everything you need to aggressively scale your business online, packaged with unmatched design and strategy.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
