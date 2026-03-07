"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Box, Torus, Cone, Sphere, TorusKnot, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { Suspense } from "react";

const shapes = [
  (props: Record<string, unknown>) => (
    <Box args={[1.5, 1.5, 1.5]} {...props}>
      <MeshWobbleMaterial color="#3b82f6" factor={0.5} speed={2} roughness={0.2} metalness={0.8} />
    </Box>
  ),
  (props: Record<string, unknown>) => (
    <Torus args={[1, 0.4, 16, 100]} {...props}>
      <MeshDistortMaterial color="#10b981" distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
    </Torus>
  ),
  (props: Record<string, unknown>) => (
    <Sphere args={[1.2, 32, 32]} {...props}>
      <MeshDistortMaterial color="#8b5cf6" distort={0.5} speed={3} roughness={0.2} metalness={0.8} wireframe />
    </Sphere>
  ),
  (props: Record<string, unknown>) => (
    <Cone args={[1.2, 2.5, 32]} {...props}>
      <MeshWobbleMaterial color="#f97316" factor={0.4} speed={2} roughness={0.3} metalness={0.6} />
    </Cone>
  ),
  (props: Record<string, unknown>) => (
    <TorusKnot args={[0.8, 0.3, 100, 16]} {...props}>
      <MeshDistortMaterial color="#f43f5e" distort={0.2} speed={1.5} roughness={0.2} metalness={0.9} />
    </TorusKnot>
  )
];

export default function Portfolio3D({ index }: { index: number }) {
  const Shape = shapes[index % shapes.length];

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <directionalLight position={[-5, -10, -5]} intensity={0.3} color="#ffffff" />
      
      <Suspense fallback={null}>
        <Float speed={3} rotationIntensity={2} floatIntensity={2}>
          <Shape rotation={[0.5, 0.5, 0]} />
        </Float>
      </Suspense>
    </Canvas>
  );
}
