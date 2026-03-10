"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { getPackageById } from "@/lib/pricing";

function ContactForm() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package');
  const activePackage = packageParam ? getPackageById(packageParam) : null;
  const packageName = activePackage ? activePackage.name : packageParam;

  const defaultSubject = packageName ? `Inquiry: ${packageName}` : "";

  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '', subject: defaultSubject, message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          serviceInterested: formValues.subject,
          message: formValues.message,
        })
      });

      if (res.ok) {
        setStatus('success');
        setFormValues({ name: '', email: '', phone: '', subject: defaultSubject, message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full bg-black/40 border transition-all duration-300 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none backdrop-blur-sm
    ${focusedField === fieldName ? 'border-white/50 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'border-white/10 hover:border-white/30'}
  `;

  return (
    <motion.form 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 tracking-wide ml-1">Full Name *</label>
          <input 
            required
            type="text"
            value={formValues.name}
            onChange={(e) => setFormValues({...formValues, name: e.target.value})}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={inputClasses('name')}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 tracking-wide ml-1">Email Address *</label>
          <input 
            required
            type="email"
            value={formValues.email}
            onChange={(e) => setFormValues({...formValues, email: e.target.value})}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={inputClasses('email')}
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 tracking-wide ml-1">Phone Number (Optional)</label>
          <input 
            type="tel"
            value={formValues.phone}
            onChange={(e) => setFormValues({...formValues, phone: e.target.value})}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            className={inputClasses('phone')}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 tracking-wide ml-1">Service Interested In</label>
          <input 
            type="text"
            value={formValues.subject}
            onChange={(e) => setFormValues({...formValues, subject: e.target.value})}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            className={inputClasses('subject')}
            placeholder="e.g. Website Overhaul"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 tracking-wide ml-1">Message</label>
        <textarea 
          required
          value={formValues.message}
          onChange={(e) => setFormValues({...formValues, message: e.target.value})}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          className={`${inputClasses('message')} min-h-[150px] resize-none`}
          placeholder="Tell us about your project goals..."
        />
      </div>

      <div className="pt-4 relative">
        <button 
          type="submit" 
          disabled={status === 'loading' || status === 'success'}
          className="group relative w-full overflow-hidden rounded-xl inline-flex p-[1px] disabled:opacity-70 disabled:cursor-not-allowed transition-transform active:scale-[0.99]"
        >
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#fff_5%,transparent_50%)] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative flex items-center justify-center w-full px-8 py-5 bg-black/80 backdrop-blur-xl rounded-xl text-white font-medium tracking-wide text-lg hover:bg-white/10 transition-colors duration-500 gap-3 border border-white/10">
            <span>
              {status === 'loading' ? 'Sending Request...' : 
               status === 'success' ? 'Message Sent Successfully' : 
               'Send Request'}
            </span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-500 ${status === 'success' ? 'text-green-400' : 'group-hover:translate-x-2'}`} />
          </div>
        </button>
        
        {status === 'error' && (
          <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-8 left-0 text-red-400 text-sm w-full text-center">
             An error occurred. Please try again or contact us directly.
          </motion.p>
        )}
        {status === 'success' && (
          <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-8 left-0 text-green-400 text-sm w-full text-center">
             Thank you! Our team will reach out within 24 hours.
          </motion.p>
        )}
      </div>
    </motion.form>
  );
}

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden selection:bg-white/30 selection:text-white pt-24 pb-20">
      
      {/* Interactive Background Glow */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen pointer-events-none opacity-20 blur-[100px]"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30, mass: 0.5 }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/70">Let's Connect</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight text-white mb-6">
            Get in <span className="font-semibold">Touch.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
            Whether you have a specific project in mind or just want to explore possibilities, 
            our team is ready to help you amplify your digital presence.
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16"
        >
          <a href="mailto:hello@amplifyco.digital" className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:border-white/30 hover:bg-white/5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white text-white group-hover:text-black transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-white font-medium mb-1">Email Us</h3>
            <p className="text-white/50 text-sm">amplifycodigital@gmail.com</p>
          </a>
          
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:border-white/30 hover:bg-white/5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white text-white group-hover:text-black transition-all">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-white font-medium mb-1">Location</h3>
            <p className="text-white/50 text-sm">Global Remote / Online</p>
          </div>

          <a href="tel:+917978664410" className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:border-white/30 hover:bg-white/5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white text-white group-hover:text-black transition-all">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-white font-medium mb-1">Call Us</h3>
            <p className="text-white/50 text-xs mb-1">+91 7978664410</p>
            <p className="text-white/50 text-xs">+91 78150 74265</p>
          </a>
        </motion.div>

        {/* The Form */}
        <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-white/30 font-light tracking-widest uppercase">Loading Interface...</div>}>
          <ContactForm />
        </Suspense>

      </div>
    </div>
  );
}
