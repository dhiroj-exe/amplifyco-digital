"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });
const AbstractLaptop = dynamic(() => import("@/components/canvas/AbstractLaptop"), { ssr: false });
const FloatingIcons = dynamic(() => import("@/components/canvas/FloatingIcons"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene>
          <AbstractLaptop />
          <FloatingIcons />
        </Scene>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Premium Digital Agency</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Turn Your Business Into a Brand
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
            AmplifyCO.digital helps businesses grow online with websites, reels, social media content, and modern marketing strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 h-14 px-8 text-lg w-full sm:w-auto transition-transform hover:scale-105 active:scale-95">
              <Link href="/pricing" className="w-full text-center">View Packages</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/10 text-white backdrop-blur-md h-14 px-8 text-lg w-full sm:w-auto transition-transform hover:scale-105 active:scale-95">
              <Link href="/contact" className="w-full text-center">Start Your Project</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Gradient Overlay for bottom blending */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
