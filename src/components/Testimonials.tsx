"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Expand testimonials to make the slider more impressive
const testimonials = [
  {
    name: "Coming Soon",
    role: "Future Partner",
    quote: "We are currently compiling our latest client reviews and success stories. Check back soon to see what our partners have to say about our work.",
    avatar: "-",
    company: "Stay Tuned"
  },
  {
    name: "Coming Soon",
    role: "Future Partner",
    quote: "We are currently compiling our latest client reviews and success stories. Check back soon to see what our partners have to say about our work.",
    avatar: "-",
    company: "Stay Tuned"
  },
  {
    name: "Coming Soon",
    role: "Future Partner",
    quote: "We are currently compiling our latest client reviews and success stories. Check back soon to see what our partners have to say about our work.",
    avatar: "-",
    company: "Stay Tuned"
  },
  {
    name: "Coming Soon",
    role: "Future Partner",
    quote: "We are currently compiling our latest client reviews and success stories. Check back soon to see what our partners have to say about our work.",
    avatar: "-",
    company: "Stay Tuned"
  },
  {
    name: "Coming Soon",
    role: "Future Partner",
    quote: "We are currently compiling our latest client reviews and success stories. Check back soon to see what our partners have to say about our work.",
    avatar: "-",
    company: "Stay Tuned"
  }
  // Add new reviews here once we get them:
  // {
  //   name: "John Doe",
  //   role: "CEO",
  //   quote: "Amazing work, highly recommended.",
  //   avatar: "J",
  //   company: "Acme Corp"
  // }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#0B0B0B] border-t border-white/5 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tighter"
          >
            Client Success
          </motion.h2>
          <p className="text-gray-400 mt-4">Swipe or click through to see what our partners say.</p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[350px] flex items-center justify-center perspective-1000">
          
          {testimonials.map((testimonial, i) => {
            // Calculate absolute distance from current index
            const distance = Math.min(
               Math.abs(currentIndex - i),
               Math.abs(currentIndex - i + testimonials.length),
               Math.abs(currentIndex - i - testimonials.length)
            );
            
            // Determine side (1 for right, -1 for left, 0 for center)
            let direction = 0;
            if (i === (currentIndex + 1) % testimonials.length || i === (currentIndex + 2) % testimonials.length) direction = 1;
            if (i === (currentIndex - 1 + testimonials.length) % testimonials.length || i === (currentIndex - 2 + testimonials.length) % testimonials.length) direction = -1;

            const isActive = distance === 0;
            const isVisible = distance <= 2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={i}
                className={`absolute w-full max-w-[340px] md:max-w-xl p-8 rounded-3xl bg-[#111111] border transition-colors shadow-2xl cursor-grab active:cursor-grabbing ${isActive ? 'border-blue-500/30' : 'border-white/5'}`}
                initial={false}
                animate={{
                  x: isActive ? 0 : direction * 150,
                  scale: isActive ? 1 : 0.85 - (distance * 0.05),
                  z: isActive ? 50 : -50 * distance,
                  opacity: isActive ? 1 : 1 - (distance * 0.4),
                  rotateY: isActive ? 0 : direction * -15,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: 10 - distance }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50) nextTestimonial();
                  else if (swipe > 50) prevTestimonial();
                }}
              >
                <Quote className={`absolute top-6 right-6 w-12 h-12 transition-colors duration-500 ${isActive ? 'text-blue-500/20' : 'text-white/5'}`} />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-black border border-white/10 flex items-center justify-center font-serif text-2xl font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className={`text-lg md:text-xl leading-relaxed italic ${isActive ? 'text-gray-200' : 'text-gray-400 line-clamp-3'}`}>
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-6 pt-4 border-t border-white/5">
                   <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{testimonial.company}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Navigation Controls */}
          <div className="absolute -bottom-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-0 right-0 flex justify-between px-4 z-50 pointer-events-none">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 hover:scale-110 active:scale-95 transition-all pointer-events-auto shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 hover:scale-110 active:scale-95 transition-all pointer-events-auto shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
