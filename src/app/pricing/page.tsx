"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { pricingData } from "@/lib/pricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  goal: string;
  cta: string;
  highlight?: boolean;
}

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
      className={`relative w-full rounded-[30px] p-[1px] flex flex-col h-full group cursor-pointer transition-all duration-500 overflow-visible ${
        tier.highlight ? "z-10" : "z-0"
      }`}
    >
      {/* Outer Glow Border / Holographic Edge - Only visible on hover or highlight */}
      <div 
        className={`absolute inset-0 rounded-[30px] transition-opacity duration-500 ${
           tier.highlight 
             ? "bg-gradient-to-b from-indigo-500 via-purple-500/20 to-transparent opacity-100 shadow-[0_0_80px_-15px_rgba(99,102,241,0.4)]" 
             : "bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-30 group-hover:opacity-100 group-hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]"
        }`} 
        style={{ transform: "translateZ(-20px)" }}
      />
      
      {/* Inner Glass Core */}
      <div 
        className="relative h-full flex flex-col p-8 rounded-[29px] bg-[#020202]/80 backdrop-blur-[40px] border border-white/5 overflow-visible"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Abstract 3D shape simulation inside card */}
        <div style={{ transform: "translateZ(-60px) rotate(-15deg)" }} className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-[40px] group-hover:bg-indigo-500/30 transition-colors duration-500 pointer-events-none" />

        {tier.highlight && (
          <div style={{ transform: "translateZ(80px)" }} className="absolute -top-4 right-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] uppercase font-black tracking-widest py-2 px-5 rounded-full shadow-[0_10px_30px_rgba(99,102,241,0.5)] border border-white/20">
            Most Popular
          </div>
        )}
        
        {/* Header Section */}
        <div style={{ transform: "translateZ(40px)" }} className="mb-6 mt-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
             <Rocket className={`w-5 h-5 ${tier.highlight ? "text-indigo-400" : "text-gray-400 group-hover:text-white transition-colors"}`} />
          </div>
          <h3 className="text-xl font-medium tracking-wide text-white mb-2">{tier.name}</h3>
          <p className="text-gray-500 text-xs leading-relaxed h-12 line-clamp-3">{tier.description}</p>
        </div>

        {/* Pricing Area - Moderate Font Sizes */}
        <div style={{ transform: "translateZ(60px)" }} className="py-6 border-y border-white/5 mb-6">
          <span className="text-gray-400 font-medium mb-2 block text-[10px] tracking-[0.2em] uppercase">Investment</span>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
             <span className="text-3xl font-light tracking-tighter text-white drop-shadow-lg">{tier.price}</span>
             {tier.period ? (
               <span className={`text-gray-400 text-sm border border-white/10 rounded-md px-2 py-0.5 ${tier.period.includes('one-time') ? 'bg-white/5' : ''}`}>
                 {tier.period.replace('/', '')}
               </span>
             ) : null}
          </div>
        </div>

        {/* Features List */}
        <ul style={{ transform: "translateZ(30px)" }} className="flex-1 space-y-4 mb-10">
          {tier.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${feature.startsWith('✔') ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'bg-gray-700'}`} />
              <span className={`text-[12px] leading-relaxed ${feature.startsWith('✔') ? 'text-gray-200' : 'text-gray-500'}`}>{feature.replace('✔ ', '').replace('❌ ', '')}</span>
            </li>
          ))}
        </ul>
        
        {/* Action Button */}
        <div style={{ transform: "translateZ(50px)" }} className="w-full mt-auto relative group/btn">
          {/* Button glow layer */}
          <div className={`absolute inset-0 rounded-2xl blur-md transition-opacity duration-300 ${tier.highlight ? "bg-indigo-500/50 opacity-100 group-active/btn:opacity-50" : "bg-white/20 opacity-0 group-hover/btn:opacity-100"}`} />
          <Link 
            href={`/pricing/${tier.id}`}
            className={`relative flex items-center justify-between w-full rounded-2xl h-12 px-6 text-xs font-bold tracking-widest transition-all overflow-hidden ${
              tier.highlight 
                ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border border-indigo-400/50" 
                : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
            }`}
          >
            <span>{tier.cta.toUpperCase()}</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const PricingSection = ({ packages }: { packages: PricingTier[] }) => {
  return (
    <div className="mb-20 perspective-[2000px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto items-stretch relative mt-12 px-4">
        {packages.map((tier: PricingTier, index: number) => (
          <PricingCard key={index} tier={tier} index={index} />
        ))}
      </div>
    </div>
  );
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            Invest in Your Growth
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Choose the specific service or full-stack package that fits your business goals. No hidden fees, just results.
          </motion.p>
        </div>

        <Tabs defaultValue="social" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-transparent border border-white/5 p-1 h-14 rounded-2xl gap-2">
               <TabsTrigger 
                 value="social" 
                 className="rounded-xl px-5 h-full text-xs font-semibold data-[state=active]:bg-[#666DFF] data-[state=active]:text-white text-gray-400 transition-all flex items-center gap-2"
               >
                 <TrendingUp className="w-4 h-4" /> Social Media
               </TabsTrigger>
               <TabsTrigger 
                 value="web" 
                 className="rounded-xl px-5 h-full text-xs font-semibold data-[state=active]:bg-[#666DFF] data-[state=active]:text-white text-gray-400 transition-all flex items-center gap-2"
               >
                 <Zap className="w-4 h-4" /> Website Dev
               </TabsTrigger>
               <TabsTrigger 
                 value="onetime" 
                 className="rounded-xl px-5 h-full text-xs font-semibold data-[state=active]:bg-[#666DFF] data-[state=active]:text-white text-gray-400 transition-all flex items-center gap-2"
               >
                 <Rocket className="w-4 h-4" /> Digital Launch
               </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="social">
            <PricingSection 
              packages={pricingData.socialMedia}
            />
          </TabsContent>
          
          <TabsContent value="web">
            <PricingSection 
              packages={pricingData.webDevelopment}
            />
          </TabsContent>
          
          <TabsContent value="onetime">
            <PricingSection 
              packages={pricingData.oneTime}
            />
          </TabsContent>
        </Tabs>

        {/* Pricing FAQ Section to fill space and add detail */}
        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-400">Everything you need to know about our services and billing.</p>
          </div>
          
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#111111] p-6 rounded-2xl border border-white/5">
              <h4 className="text-lg font-bold text-white mb-2">Are there any hidden fees or setup costs?</h4>
              <p className="text-gray-400 text-sm leading-relaxed">No. We maintain absolute transparency. The price listed is exactly what you pay. For custom Web Development packages, all standard integrations and modern UI are included initially. Any extra external tools (like premium paid plugins or massive ad campaign spends) are billed separately or straight through the provider.</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#111111] p-6 rounded-2xl border border-white/5">
              <h4 className="text-lg font-bold text-white mb-2">How do the monthly Social Media packages work?</h4>
              <p className="text-gray-400 text-sm leading-relaxed">It is a month-to-month subscription. We start with a strategy call, batch-create the content (Posts and Reels), get your approval, and handle everything from posting to hashtag optimization. You can cancel or pause between billing cycles.</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#111111] p-6 rounded-2xl border border-white/5">
              <h4 className="text-lg font-bold text-white mb-2">How long does a website take to build?</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Typically, a Starter website takes 1-2 weeks from the moment we receive your content and branding. Premium Business packages and full Digital Launches may take 3-4 weeks to ensure every animation, SEO detail, and custom integration is flawless before deployment.</p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
