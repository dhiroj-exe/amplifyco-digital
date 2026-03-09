"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

import { Twitter, Linkedin, Instagram, Eye, Sparkles, Zap } from "lucide-react";

const founders = [
  {
    name: "Kumar Arav Routray",
    role: "Co-Founder · Growth Lead",
    image: "/team/founder_1.jpg",
    color: "from-blue-500/20 to-indigo-500/5",
    intro: "Driving business growth through strategy, client relationships, and digital positioning.",
    bio: "Focused on helping brands expand their reach and turn online visibility into real customers.",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
    skills: ["Growth Strategy", "Client Relations", "Digital Positioning"]
  },
  {
    name: "Dhiroj Nayak",
    role: "Co-Founder · Technical Lead",
    image: "/team/founder_2.jpg",
    color: "from-purple-500/20 to-pink-500/5",
    intro: "Building modern websites, digital platforms, and AI-powered systems.",
    bio: "Focused on helping businesses establish a powerful online presence and scale efficiently with robust architectures.",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
    skills: ["Web Development", "Platform Architecture", "AI Systems"]
  },
  {
    name: "Trinath Mohanty",
    role: "Co-Founder · Creative Lead",
    image: "/team/founder_3.jpg",
    color: "from-emerald-500/20 to-teal-500/5",
    intro: "Crafting visual experiences, reels, and brand storytelling that capture attention.",
    bio: "Dedicated to making businesses stand out in the digital world through highly engaging content and creative direction.",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
    skills: ["Visual Experience", "Brand Storytelling", "Content Creation"]
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FounderCard = ({ founder, index }: { founder: Record<string, any>; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Enhanced intense rotation
    const rotateXValue = ((y - centerY) / centerY) * -25;
    const rotateYValue = ((x - centerX) / centerX) * 25;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
      className="perspective-[2500px] h-[550px] md:h-[580px] w-full mt-20"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: isFlipped
            ? `rotateY(180deg) scale(1.05)`
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        className="relative w-full h-full cursor-pointer group"
      >
        {/* --- FRONT FACE --- */}
        <div
          className="absolute inset-0 rounded-[40px] overflow-visible border border-white/5 bg-gradient-to-br from-white/5 to-white/0 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] backdrop-blur-3xl flex flex-col justify-end p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Holographic Glowing Border Layer */}
          <div className="absolute inset-0 rounded-[40px] border-[0.5px] border-indigo-500/20 shadow-[inset_0_0_80px_rgba(99,102,241,0.1)] group-hover:shadow-[inset_0_0_120px_rgba(99,102,241,0.3)] transition-all duration-700 pointer-events-none" />

          {/* Floating Ambient Props (Orbiting Orbs) */}
          <div
            className="absolute top-0 right-[-10px] w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[2px] opacity-70 group-hover:-translate-y-8 group-hover:translate-x-8 transition-transform duration-[1.5s] ease-out pointer-events-none"
            style={{ transform: "translateZ(80px)" }}
          />
          <div
            className="absolute top-[100px] left-[-20px] w-12 h-12 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-lg blur-[1px] rotate-45 opacity-50 group-hover:rotate-90 group-hover:translate-y-8 transition-all duration-[2s] ease-out pointer-events-none"
            style={{ transform: "translateZ(120px)" }}
          />

          {/* 3D Framing Elements (Behind the Image) */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-76 border-2 border-white/10 rounded-3xl group-hover:border-indigo-500/40 group-hover:rotate-[10deg] group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-[1s] ease-out pointer-events-none z-20"
            style={{ transform: "translateZ(40px) translateX(-50%)" }}
          />
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-60 border border-white/5 rounded-3xl group-hover:border-emerald-500/30 group-hover:-rotate-[15deg] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-[1s] ease-out pointer-events-none z-20"
            style={{ transform: "translateZ(60px) translateX(-50%)" }}
          />

          {/* Protruding 3D Image Container */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-52 h-68 rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] group-hover:-translate-y-10 group-hover:scale-110 transition-all duration-[0.8s] cubic-bezier(0.34,1.56,0.64,1) z-30 origin-bottom"
            style={{ transform: "translateZ(100px) translateX(-50%)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-700" />
            <img
              src={founder.image}
              alt={founder.name}
              className="w-full h-full object-cover saturate-50 contrast-125 group-hover:saturate-150 transition-all duration-700"
            />
          </div>

          {/* Background Core Glow inside card */}
          <div className={`absolute inset-0 bg-gradient-to-t ${founder.color} rounded-[40px] opacity-30 group-hover:opacity-50 transition-opacity duration-700`}></div>

          {/* Front Text Content */}
          <div className="relative z-40 text-center mt-28" style={{ transform: "translateZ(50px)" }}>
            <h3 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-1 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all">
              {founder.name}
            </h3>
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-4">
              <p className="text-indigo-300 text-xs font-bold tracking-[0.2em] uppercase">
                {founder.role}
              </p>
            </div>

            {/* NEW: Skills / Core Focus Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-4 px-2">
              {founder.skills.map((skill: string, idx: number) => (
                <span key={idx} className="text-[10px] uppercase font-bold tracking-wider text-gray-300 bg-black/40 border border-white/10 px-2 py-1 rounded-md backdrop-blur-md">
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-gray-300 font-medium text-[15px] leading-relaxed drop-shadow-lg px-4 italic opacity-80 group-hover:opacity-100 transition-opacity">
              &quot;{founder.intro}&quot;
            </p>

            <div className="mt-6 opacity-60 group-hover:opacity-100 transition-opacity flex justify-center items-center gap-3">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-white/40" />
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/80 animate-[pulse_2s_ease-in-out_infinite]">Click to Flip</span>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-white/40" />
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className="absolute inset-0 rounded-[40px] border border-white/10 bg-[#060606] shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] flex flex-col justify-between p-10 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://transparenttextures.com/patterns/cubes.png')] rounded-[40px] pointer-events-none" />
          <div className={`absolute inset-0 bg-gradient-to-br ${founder.color} opacity-20 rounded-[40px] blur-3xl pointer-events-none`} />

          <div className="relative z-10 w-full flex justify-between items-start" style={{ transform: "translateZ(40px)" }}>
            <div>
              <h3 className="text-3xl font-black text-white">{founder.name.split(' ')[0]}<span className="text-gray-600 block">{founder.name.split(' ')[1]}</span></h3>
            </div>
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg">
              <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="relative z-20" style={{ transform: "translateZ(60px)" }}>
            <p className="text-gray-400 text-sm leading-8 font-medium">
              {founder.bio}
            </p>
          </div>

          <div className="relative z-20 flex items-center justify-between border-t border-white/10 pt-8 mt-4" style={{ transform: "translateZ(40px)" }}>
            <div className="flex gap-3">
              <a href={founder.social.twitter} onClick={(e) => e.stopPropagation()} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={founder.social.linkedin} onClick={(e) => e.stopPropagation()} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0a66c2] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(10,102,194,0.2)] transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={founder.social.instagram} onClick={(e) => e.stopPropagation()} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#e1306c] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(225,48,108,0.2)] transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <button onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }} className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors">
              Return
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">The Minds Behind AmplifyCO</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            Meet Your New Growth Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We are a collective of strategists, designers, and growth engineers committed to turning local businesses into premium digital brands.
          </motion.p>
        </div>

        {/* Agency Mission Statement */}
        <div className="mb-32 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(99,102,241,0.2)]"
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">The AmplifyCO Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                AmplifyCO was founded on a simple premise: most businesses have incredible products but terrible online presence. In a world driven by aesthetics and instantly categorized value, an outdated website or poor social strategy literally burns money.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We bridge that gap. We don&apos;t just &quot;build websites&quot; or &quot;post on social media.&quot; We engineer comprehensive digital identities that command respect, capture attention, and drive unrelenting growth for ambitious brands worldwide.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white tracking-tighter">Small Team. Massive Impact.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {founders.map((founder, index) => (
            <FounderCard key={index} founder={founder} index={index} />
          ))}
        </div>

        {/* Floating Core Values Section */}
        <div className="relative mb-32 py-32 perspective-[2000px]">
          {/* Animated Matrix Grid Background */}
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="text-center mb-16 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter"
            >
              Our Philosophy
            </motion.h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 px-4"
          >
            {[
              { title: "Radical Transparency", desc: "No vanity metrics. No fluff. Just raw data and measurable ROI that translates directly to your bottom line.", icon: <Eye strokeWidth={1.5} className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />, color: "from-blue-500/20 to-indigo-500/5", glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]" },
              { title: "Relentless Aesthetics", desc: "We believe that premium design is a profound competitive advantage. First impressions dictate customer trust.", icon: <Sparkles strokeWidth={1.5} className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />, color: "from-purple-500/20 to-pink-500/5", glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]" },
              { title: "Obsessive Execution", desc: "Strategy without execution is hallucination. We architect, build, and deploy with military precision.", icon: <Zap strokeWidth={1.5} className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />, color: "from-emerald-500/20 to-teal-500/5", glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]" }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: 20 },
                  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className="group relative p-10 rounded-[40px] bg-[#070707] border border-white/5 overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] transition-all duration-700"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Immersive Card Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:animate-[sweep_2.5s_ease-in-out_infinite]" />
                
                {/* Content Container (lifted off card) */}
                <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                  <div className={`mb-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_16px_rgba(0,0,0,0.5)] group-hover:${value.glow}`}>
                    {value.icon}
                  </div>
                  <h4 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 text-[15px] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Ultra Premium Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[60px] border border-white/10 p-16 md:p-24 text-center overflow-hidden bg-[#030303] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] group"
        >
          {/* Animated CTA Background Orbs - More intense on hover */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-[pulse_4s_easeInOut_infinite] group-hover:bg-indigo-500/30 transition-colors duration-1000" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-[pulse_6s_easeInOut_infinite] group-hover:bg-purple-500/30 transition-colors duration-1000" />
          
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">Accepting New Clients Space</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">Amplify</span> Your Brand?
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              Stop settling for mediocrity. Join the ambitious founders who trust us to architect their digital dominance.
            </p>
            
            <motion.a 
              href="/contact"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn relative inline-flex items-center justify-center px-10 py-5 bg-white text-black font-black text-lg uppercase tracking-[0.2em] rounded-full overflow-hidden shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-500"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-200 via-white to-purple-200 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                Book a Strategy Call
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
