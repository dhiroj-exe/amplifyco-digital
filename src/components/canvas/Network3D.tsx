"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

// A highly dynamic, forward-moving particle tunnel
function WarpTunnel() {
  const count = 4000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Create a deep, long array of particles
  const { positions, colorArray, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    const colorA = new THREE.Color("#4f46e5"); // Indigo-600
    const colorB = new THREE.Color("#a855f7"); // Purple-500
    const colorC = new THREE.Color("#ffffff"); // White
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
        // Distribute in a cylinder/tunnel shape
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 20; // Hollow center
        const z = (Math.random() - 0.5) * 150; // Very deep Z axis
        
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = Math.sin(angle) * radius;
        positions[i * 3 + 2] = z;

        // Mix colors: further out = darker, center = brighter
        const mix = Math.random();
        if (mix < 0.6) tempColor.copy(colorA);
        else if (mix < 0.9) tempColor.copy(colorB);
        else tempColor.copy(colorC);
        
        // Random speed for parallax feeling
        speeds[i] = 10 + Math.random() * 20;

        tempColor.toArray(colors, i * 3);
    }
    
    return { positions, colorArray: colors, speeds };
  }, [count]);

  const dummy = new THREE.Object3D();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Slowly rotate the entire tunnel
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;

    // Move particles forward constantly
    for (let i = 0; i < count; i++) {
        let x = positions[i * 3];
        let y = positions[i * 3 + 1];
        let z = positions[i * 3 + 2];
        
        // Move towards camera
        z += speeds[i] * delta;
        
        // Loop back when passing camera
        if (z > 30) {
            z = -120; // reset far back
        }
        
        // Save new position
        positions[i * 3 + 2] = z;
        
        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.05, 0.05, 2]}>
        <instancedBufferAttribute 
            attach="attributes-color" 
            args={[colorArray, 3]} 
        />
      </boxGeometry>
      <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}

export default function Network3D() {
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
    <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none">
      {isVisible && !isMobile && (
        <Canvas 
          camera={{ position: [0, 0, 0], fov: 75 }} 
          dpr={[1, 1.5]} 
          gl={{ powerPreference: "high-performance", antialias: false, alpha: true }} 
          frameloop="always"
        >
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 10, 80]} />
          <WarpTunnel />
        </Canvas>
      )}
    </div>
  );
}
