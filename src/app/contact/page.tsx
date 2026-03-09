"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { getPackageById } from "@/lib/pricing";

function ExecutiveIntakeForm() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package');
  const activePackage = packageParam ? getPackageById(packageParam) : null;
  const packageName = activePackage ? activePackage.name : packageParam;

  const defaultSubject = packageName ? `Inquiry: ${packageName} Custom Execution` : "";

  // Dynamic label styling based on input focus/content for the "Zero Border" look
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ name: '', email: '', subject: defaultSubject, message: '' });

  return (
    <div className="w-full flex justify-center py-12 md:py-24">
      
      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full max-w-xl space-y-16" 
        onSubmit={(e) => e.preventDefault()}
      >
        
        {/* Massive Minimalist Input: Name */}
        <div className="relative group">
          <label 
            htmlFor="name" 
            className={`absolute left-0 transition-all duration-300 font-light pointer-events-none
              ${focusedInput === 'name' || formValues.name ? '-top-6 text-sm text-white/50 tracking-widest uppercase' : 'top-0 text-3xl md:text-5xl text-white/30'}
            `}
          >
            {focusedInput === 'name' || formValues.name ? 'Your Name' : 'Who are you?'}
          </label>
          <input 
            id="name"
            type="text"
            value={formValues.name}
            onChange={(e) => setFormValues({...formValues, name: e.target.value})}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
            className="w-full bg-transparent border-b border-white/10 text-3xl md:text-5xl font-light text-white pb-4 focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-transparent"
            placeholder="Name"
          />
        </div>

        {/* Massive Minimalist Input: Email */}
        <div className="relative group">
          <label 
            htmlFor="email" 
            className={`absolute left-0 transition-all duration-300 font-light pointer-events-none
              ${focusedInput === 'email' || formValues.email ? '-top-6 text-sm text-white/50 tracking-widest uppercase' : 'top-0 text-3xl md:text-5xl text-white/30'}
            `}
          >
            {focusedInput === 'email' || formValues.email ? 'Your Email' : 'Where can we reach you?'}
          </label>
          <input 
            id="email"
            type="email"
            value={formValues.email}
            onChange={(e) => setFormValues({...formValues, email: e.target.value})}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            className="w-full bg-transparent border-b border-white/10 text-3xl md:text-5xl font-light text-white pb-4 focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-transparent"
            placeholder="Email"
          />
        </div>

        {/* Optional Subject Line */}
        <div className="relative group pt-4">
           <label className="text-sm text-white/50 tracking-widest uppercase mb-4 block">Discussion Topic</label>
           <input 
              id="subject"
              type="text"
              value={formValues.subject}
              onChange={(e) => setFormValues({...formValues, subject: e.target.value})}
              onFocus={() => setFocusedInput('subject')}
              onBlur={() => setFocusedInput(null)}
              className="w-full bg-transparent border-b border-white/10 text-xl md:text-2xl font-light text-white pb-4 focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20"
              placeholder="E.g., Complete Brand Overhaul"
           />
        </div>

        {/* Minimalist Textarea */}
        <div className="relative group pt-4">
           <label className="text-sm text-white/50 tracking-widest uppercase mb-4 block">Project Details</label>
           <textarea 
              id="message"
              value={formValues.message}
              onChange={(e) => setFormValues({...formValues, message: e.target.value})}
              onFocus={() => setFocusedInput('message')}
              onBlur={() => setFocusedInput(null)}
              className="w-full bg-transparent border-b border-white/10 text-xl font-light text-white pb-4 focus:outline-none focus:border-white transition-colors rounded-none min-h-[120px] resize-none placeholder:text-white/20"
              placeholder="Tell us about the legacy you want to build..."
           />
        </div>

        {/* Magnetic Aesthetic Submit Button */}
        <div className="pt-8">
           <button className="group relative w-full overflow-hidden rounded-full inline-flex p-[1px]">
             <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#fff_5%,transparent_50%)] opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="relative flex items-center justify-between w-full px-8 py-6 bg-black backdrop-blur-3xl rounded-full text-white font-light tracking-[0.2em] uppercase text-sm hover:bg-white/5 transition-colors duration-500">
                <span>Initiate Sequence</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
             </div>
           </button>
        </div>

      </motion.form>
    </div>
  );
}

// Full page layout mimicking high-end architectural firm sites
export default function ContactPage() {
  
  // Rotating geometric background state
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#000] overflow-hidden selection:bg-white/30 selection:text-white">
      
      {/* Absolute Ambient Background Layer */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <div className="flex flex-col lg:flex-row min-h-screen w-full relative z-20">
         
         {/* Left Side: Editorial Typography & Ambient Data */}
         <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen relative flex items-center p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/10">
            
            {/* The Massive Geometric Rotating Ambient Glow */}
            <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none"
               style={{ rotate: rotation }}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 2, ease: "easeOut" }}
            >
               <div className="absolute top-0 w-full h-full border border-white/5 rounded-full rotate-45" />
               <div className="absolute top-0 w-full h-full border border-white/5 rounded-full -rotate-45" />
               {/* Slow Breathing Pulse */}
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" 
               />
            </motion.div>

            <div className="relative z-10 w-full">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1 }}
               >
                 <div className="inline-flex items-center gap-3 mb-12">
                   <div className="w-12 h-[1px] bg-white/40"></div>
                   <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">Executive Intake</span>
                 </div>
                 
                 <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white mb-8 leading-[0.9]">
                   Shape <br/> <span className="font-serif italic text-white/40 ml-12">history.</span>
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-white/60 font-light max-w-md leading-relaxed">
                   We partner exclusively with visionaries. Let&apos;s engineer a digital presence that cannot be ignored.
                 </p>
               </motion.div>

               {/* Direct Contact Hover Rows (Replacing the basic cards) */}
               <div className="grid grid-cols-1 mt-24 gap-y-2 border-t border-white/10 pt-12">
                  <a href="mailto:anplifycodigital@gmail.com" className="group flex items-center justify-between py-6 border-b border-white/10 hover:border-white/50 transition-colors duration-500">
                     <div className="flex items-center gap-6">
                       <span className="text-sm font-mono tracking-widest text-white/40 group-hover:text-white transition-colors duration-500">01</span>
                       <span className="text-2xl font-light tracking-wide text-white/70 group-hover:text-white transition-colors duration-500">Email Dossier</span>
                     </div>
                     <Mail className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                  </a>
                  
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-6 border-b border-white/10 hover:border-white/50 transition-colors duration-500">
                     <div className="flex items-center gap-6">
                       <span className="text-sm font-mono tracking-widest text-white/40 group-hover:text-white transition-colors duration-500">02</span>
                       <span className="text-2xl font-light tracking-wide text-white/70 group-hover:text-white transition-colors duration-500">Encrypted Chat</span>
                     </div>
                     <MessageCircle className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                  </a>
                  
                  <a href="https://instagram.com/amplifyco.digital" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-6 border-b border-white/10 hover:border-white/50 transition-colors duration-500">
                     <div className="flex items-center gap-6">
                       <span className="text-sm font-mono tracking-widest text-white/40 group-hover:text-white transition-colors duration-500">03</span>
                       <span className="text-2xl font-light tracking-wide text-white/70 group-hover:text-white transition-colors duration-500">Social Grid</span>
                     </div>
                     <Instagram className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                  </a>
               </div>

            </div>

         </div>

         {/* Right Side: The Zero-Border Minimalist Form */}
         <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex items-center px-6 md:px-16 lg:px-24 bg-gradient-to-br from-black to-[#050505] relative overflow-hidden">
            
            {/* Very faint background gradient linked to the right side */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] pointer-events-none rounded-full" />
            
            <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-white/30 font-light tracking-widest uppercase">Initializing...</div>}>
              <ExecutiveIntakeForm />
            </Suspense>

         </div>

      </div>

    </div>
  );
}
