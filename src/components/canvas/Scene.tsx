"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Scene({ children, className }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full relative pointer-events-none ${className || ""}`}>
      {isVisible && !isMobile && (
        <Canvas 
          shadows 
          dpr={[1, 1.5]} // Capped dpr for performance
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 10], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            {children}
            <Environment preset="city" />
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
