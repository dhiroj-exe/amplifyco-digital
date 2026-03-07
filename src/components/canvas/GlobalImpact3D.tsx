"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Sphere args={[2, 64, 64]} ref={meshRef}>
      <MeshDistortMaterial
        color="#4f46e5"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
      />
    </Sphere>
  );
}

function InnerCore() {
  return (
    <Sphere args={[1.4, 32, 32]}>
      <meshStandardMaterial
        color="#000000"
        roughness={0.1}
        metalness={0.9}
        emissive="#4f46e5"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

export default function GlobalImpact3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#c084fc" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#4f46e5" />
      
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <AnimatedSphere />
      <InnerCore />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        maxPolarAngle={Math.PI / 1.5} 
        minPolarAngle={Math.PI / 3} 
      />
    </Canvas>
  );
}
