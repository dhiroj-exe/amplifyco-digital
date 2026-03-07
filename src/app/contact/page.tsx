"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getPackageById } from "@/lib/pricing";

function ContactFormContent() {

  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package');

  const activePackage = packageParam ? getPackageById(packageParam) : null;
  const packageName = activePackage ? activePackage.name : packageParam;

  const defaultSubject = packageName
    ? `Inquiry: ${packageName} Package`
    : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative mt-16">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#111111] border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

        <h3 className="text-2xl font-bold text-white mb-2">Send us a message</h3>
        <p className="text-gray-400 mb-8 border-b border-white/10 pb-8 hover:text-white transition-colors">
          &quot;Tell us about your business. We promise we don&apos;t bite.&quot;
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Name</Label>
              <Input id="name" placeholder="John Doe" className="bg-white/5 border-white/10 text-white h-12 focus-visible:ring-indigo-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white h-12 focus-visible:ring-indigo-500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-300">Subject</Label>
            <Input id="subject" defaultValue={defaultSubject} placeholder="How can we help?" className="bg-white/5 border-white/10 text-white h-12 focus-visible:ring-indigo-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-300">Message</Label>
            <Textarea id="message" placeholder="Tell us about your project goals..." className="bg-white/5 border-white/10 text-white min-h-[150px] focus-visible:ring-indigo-500" />
          </div>

          <Button className="w-full h-14 bg-white text-black hover:bg-gray-200 text-lg rounded-xl font-semibold gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
            Send Message
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </motion.div>

      {/* Direct Contact Links */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col justify-center space-y-8"
      >
        <div>
          <h3 className="text-3xl font-bold text-white mb-4">Other ways to connect</h3>
          <p className="text-gray-400 max-w-md">Prefer to DM or chat right now? We&apos;re active on all channels during business hours.</p>
        </div>

        <div className="space-y-4">
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:translate-x-2 group">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500/20 group-hover:scale-110 transition-all">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">WhatsApp</h4>
              <p className="text-gray-400 text-sm">Fastest response times</p>
            </div>
          </a>

          <a href="mailto:anplifycodigital@gmail.com" className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:translate-x-2 group">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Email Us</h4>
              <p className="text-gray-400 text-sm">anplifycodigital@gmail.com</p>
            </div>
          </a>

          <a href="https://instagram.com/amplifyco.digital" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:translate-x-2 group">
            <div className="w-14 h-14 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 group-hover:bg-pink-500/20 group-hover:scale-110 transition-all">
              <Instagram className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Instagram</h4>
              <p className="text-gray-400 text-sm">@amplifyco.digital</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Let&apos;s Build <span className="text-gray-500">Something Great</span>
          </motion.h1>
        </div>

        <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-gray-400">Loading form...</div>}>
          <ContactFormContent />
        </Suspense>
      </div>
    </div>
  );
}
