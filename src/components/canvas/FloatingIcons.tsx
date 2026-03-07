"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingIcons() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -2]}>
        <Icosahedron args={[1, 0]}>
          <meshStandardMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </Icosahedron>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} position={[4, -1, -3]}>
        <Torus args={[0.8, 0.2, 16, 32]}>
          <meshStandardMaterial color="#88aaff" roughness={0.1} metalness={0.8} />
        </Torus>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={[-3, -3, -1]}>
        <Octahedron args={[0.7, 0]}>
          <meshStandardMaterial color="#444444" roughness={0.2} metalness={0.9} />
        </Octahedron>
      </Float>
    </group>
  );
}
