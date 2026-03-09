"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Environment, Float } from "@react-three/drei";

function GeometricEcosystem() {
  const meshRef = useRef<THREE.Mesh>(null);
  const secondaryMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (secondaryMeshRef.current) {
      secondaryMeshRef.current.rotation.x = state.clock.elapsedTime * -0.15;
      secondaryMeshRef.current.rotation.y = state.clock.elapsedTime * -0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {/* Inner solid core */}
      <mesh ref={secondaryMeshRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} wireframe />
      </mesh>

      {/* Outer abstract wireframe structure */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#a855f7" 
          emissive="#6366f1"
          emissiveIntensity={0.5}
          transparent 
          opacity={0.8} 
          wireframe
        />
      </mesh>
      
      {/* Data particle nodes at vertices */}
      <points>
        <icosahedronGeometry args={[2.5, 1]} />
        <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.8} />
      </points>
      
      <Environment preset="city" />
    </Float>
  );
}

export default function Ecosystem3D() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <GeometricEcosystem />
      </Canvas>
    </div>
  );
}
