"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/Portfolio";
import { Star, TrendingUp, Target, BarChart } from "lucide-react";

const successStories = [
  {
    name: "TechFlow Solutions",
    role: "Sarah Jenkins, CEO",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-600 to-indigo-900",
    bgAccent: "bg-blue-500/20",
    icon: TrendingUp,
    intro: "AmplifyCO completely reimagined our digital acquisition funnel.",
    bio: "Before working with AmplifyCO, we were stuck at $2M ARR with minimal inward lead generation. Their new web infrastructure and brand positioning helped us scale to $10M in just 14 months.",
    stat: "$10M+ ARR"
  },
  {
    name: "Nova Dynamics",
    role: "Marcus Chen, Founder",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
    color: "from-purple-600 to-pink-900",
    bgAccent: "bg-purple-500/20",
    icon: Target,
    intro: "The most insanely high-converting landing pages we've ever seen.",
    bio: "We burned thousands on ads with no return. AmplifyCO stepped in, ripped our old site down, and built a machine that converts at a staggering 14% on completely cold traffic.",
    stat: "14% Conversion"
  },
  {
    name: "Atlas Fitness",
    role: "Elena Rodriguez, CMO",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    color: "from-emerald-600 to-teal-900",
    bgAccent: "bg-emerald-500/20",
    icon: BarChart,
    intro: "Our brand finally matches the quality of our premium services.",
    bio: "AmplifyCO didn't just design a website; they architected a digital experience that completely revolutionized our brand perception among high-net-worth clients.",
    stat: "300% ROI"
  },
];

export default function TestimonialsPage() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Don&apos;t Just Take Our Word For It</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Client Success Stories
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            See how we&apos;ve helped businesses transform their digital presence and consistently break their revenue records.
          </motion.p>
        </div>
      </div>
      
      {/* Reusing the Landing Page component for the grid */}
      <Testimonials />

      {/* Featured Work / Portfolio moved here */}
      <Portfolio />
      
      {/* The "Book Pages" Accordion replacing the video block */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white tracking-tighter mb-4">The Case Studies</h2>
          <p className="text-gray-400">Interactive records of massive growth.</p>
        </div>
        
        <div className="w-full h-[450px] md:h-[500px] flex flex-col md:flex-row gap-4 perspective-[2000px]">
          {successStories.map((story, index) => {
            const isActive = activeStory === index;
            // Book page flipping physics
            const rotationY = isActive ? 0 : (index < activeStory ? 15 : -15);
            const origin = index < activeStory ? "right center" : "left center";

            return (
              <motion.div
                key={index}
                layout
                onClick={() => setActiveStory(index)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateY: rotationY
                }}
                style={{
                  transformOrigin: origin,
                  transformStyle: "preserve-3d"
                }}
                transition={{ 
                  layout: { duration: 0.8, type: "spring", bounce: 0.2 },
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  rotateY: { duration: 0.8, type: "spring", bounce: 0.2 }
                }}
                className={`relative overflow-hidden rounded-[20px] cursor-pointer group shadow-2xl ${
                  isActive ? "flex-[10] md:flex-[8]" : "flex-[2] md:flex-[1.5]"
                }`}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 bg-black">
                  <motion.img 
                    layout="position"
                    src={story.image} 
                    alt={story.name} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.5s] ease-out ${
                      isActive 
                        ? "scale-105 opacity-60 brightness-75 grayscale-0" 
                        : "scale-125 opacity-40 brightness-50 grayscale hover:opacity-60"
                    }`}
                  />
                  <div className={`absolute inset-0 transition-opacity duration-1000 ${
                    isActive ? "bg-gradient-to-t from-black via-black/60 to-transparent opacity-100" : "bg-black/60"
                  }`} />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${story.color} mix-blend-overlay transition-opacity duration-1000 ${
                    isActive ? "opacity-50" : "opacity-0 group-hover:opacity-30"
                  }`} />
                </div>

                {/* INACTIVE STATE CONTENT (Book Spines) */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 pointer-events-none">
                     <div className="w-1 h-8 bg-white/20 rounded-full mb-6 group-hover:bg-white/50 transition-colors" />
                     <h3 
                       className="text-white text-xl font-bold uppercase tracking-[0.3em] whitespace-nowrap rotate-180 opacity-60 group-hover:opacity-100 transition-opacity" 
                       style={{ writingMode: 'vertical-rl' }}
                     >
                        {story.name}
                     </h3>
                  </div>
                )}

                {/* ACTIVE STATE CONTENT (Open Book Page) */}
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 pointer-events-none"
                  >
                    <div className="w-full h-full flex flex-col justify-end border-l-2 border-white/10 pl-6 md:pl-10 pb-4">
                      <div className="flex items-center gap-3 mb-6">
                         <div className={`p-2 rounded-xl border border-white/10 backdrop-blur-md bg-white/5 shadow-inner`}>
                           <story.icon className="w-5 h-5 text-white/80" />
                         </div>
                         <div>
                            <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest block">{story.role}</span>
                         </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-10 w-full">
                         <div className="flex-1">
                           <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-4 drop-shadow-xl">
                             {story.name}
                           </h2>
                           <p className="text-lg md:text-xl text-indigo-200 font-light italic mb-6">
                             &quot;{story.intro}&quot;
                           </p>
                           <p className="text-gray-300 text-sm md:text-base leading-relaxed hidden md:block w-11/12 border-l border-white/20 pl-4 py-1">
                             {story.bio}
                           </p>
                         </div>
                         
                         <div className="text-left md:text-right shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                            <div className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold mb-2">Outcome</div>
                            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tighter">
                              {story.stat}
                            </div>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
