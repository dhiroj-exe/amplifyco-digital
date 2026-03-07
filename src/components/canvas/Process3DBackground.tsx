"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";

export default function Process3DBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <directionalLight position={[-2, -5, -2]} intensity={0.5} color="#818cf8" />
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Icosahedron args={[1.5, 4]} position={[0, 0, 0]}>
          <MeshDistortMaterial 
            color="#4f46e5" 
            speed={2} 
            distort={0.4} 
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </Icosahedron>
      </Float>
    </Canvas>
  );
}
