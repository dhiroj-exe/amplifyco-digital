"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere, useBox } from "@react-three/cannon";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// The invisible sphere that tracks the mouse to push physical objects around
function MousePointer() {
  const { viewport } = useThree();
  const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }));
  
  useFrame((state) => {
    // Move the physical pointer to exactly where the mouse is in 3D space
    const x = (state.mouse.x * viewport.width) / 2;
    const y = (state.mouse.y * viewport.height) / 2;
    api.position.set(x, y, 0);
  });
  
  return (
    <mesh ref={ref as React.MutableRefObject<THREE.Mesh>}>
      <sphereGeometry args={[3, 16, 16]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}

// Generates physics-enabled spheres that bounce around the bounds and react to the MousePointer
function InstancedSpheres({ count = 80 }) {
  const [ref] = useSphere((index: number) => ({
    mass: 1,
    position: [Math.random() - 0.5, Math.random() - 0.5, index * 2],
    args: [1],
    linearDamping: 0.5, // Slow them down over time
    angularDamping: 0.5,
  }));

  // Create a beautiful premium dark glass material
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#4f46e5",
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.9, // glass-like
    ior: 1.5,
    thickness: 0.5,
    clearcoat: 1,
  }), []);

  return (
    <instancedMesh ref={ref as React.MutableRefObject<THREE.InstancedMesh>} castShadow receiveShadow args={[undefined, material, count]}>
      <sphereGeometry args={[1, 32, 32]} />
    </instancedMesh>
  );
}

// Bounding box to keep spheres inside the view
function PhysicsBounds() {
  const { viewport } = useThree();
  const width = viewport.width;
  const height = viewport.height;
  
  // Create invisible kinematic walls
  const Wall = ({ position, args }: { position: [number, number, number], args: [number, number, number] }) => {
    useBox(() => ({ type: "Static", args, position }));
    return null;
  };

  return (
    <>
      <Wall position={[0, -height / 2 - 2, 0]} args={[width, 2, 20]} /> {/* Floor */}
      <Wall position={[0, height / 2 + 2, 0]} args={[width, 2, 20]} /> {/* Ceiling */}
      <Wall position={[-width / 2 - 2, 0, 0]} args={[2, height, 20]} /> {/* Left */}
      <Wall position={[width / 2 + 2, 0, 0]} args={[2, height, 20]} /> {/* Right */}
      <Wall position={[0, 0, -10]} args={[width, height, 2]} /> {/* Back */}
      <Wall position={[0, 0, 10]} args={[width, height, 2]} /> {/* Front */}
    </>
  );
}

export default function InteractiveScene3D() {
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
    <div ref={containerRef} className="w-full h-full relative pointer-events-none">
      {isVisible && !isMobile && (
        <Canvas 
          shadows 
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: true }}
          camera={{ position: [0, 0, 20], fov: 45 }}
          style={{ cursor: "crosshair" }}
        >
          <color attach="background" args={["#030303"]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} castShadow color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
          
          <Physics gravity={[0, 0, 0]} defaultContactMaterial={{ restitution: 0.8, friction: 0.1 }}>
            <PhysicsBounds />
            <MousePointer />
            <InstancedSpheres count={60} />
          </Physics>
          
          <Environment preset="city" />
        </Canvas>
      )}
    </div>
  );
}
