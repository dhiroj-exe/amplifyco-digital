"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Rocket, CircleDollarSign } from "lucide-react";
import dynamic from "next/dynamic";

const Process3DBackground = dynamic(() => import("@/components/canvas/Process3DBackground"), {
  ssr: false,
});

const steps = [
  {
    title: "Understand your business",
    description: "We audit your current presence and define a scale-ready strategy.",
    icon: Search,
  },
  {
    title: "Build your digital presence",
    description: "Our team designs high-converting websites and creates premium content.",
    icon: PenTool,
  },
  {
    title: "Launch content and website",
    description: "We go live with an integrated plan across social channels and your new site.",
    icon: Rocket,
  },
  {
    title: "Start attracting customers",
    description: "Watch your organic reach and paid conversions compound month over month.",
    icon: CircleDollarSign,
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      {/* Background 3D element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen h-[400px] md:h-full mt-24 md:mt-0">
        <Process3DBackground />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tighter"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (visible on md+) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-background border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-2xl group-hover:-translate-y-2 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -bottom-4 bg-background border border-white/10 text-xs font-mono px-2 py-1 rounded-full text-gray-400">
                  Step 0{index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold tracking-tight mb-3 text-white group-hover:text-blue-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
