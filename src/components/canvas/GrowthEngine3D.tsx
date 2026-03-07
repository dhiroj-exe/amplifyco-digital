"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, RoundedBox, Html } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Instagram, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";

// Social Media Data Definitions
const SOCIAL_LINKS = [
  {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    url: "https://instagram.com",
    position: [-3, 1.5, 1] as [number, number, number],
    icon: Instagram,
    delay: 0,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "#0077B5",
    url: "https://linkedin.com",
    position: [0, 2.5, -1] as [number, number, number],
    icon: Linkedin,
    delay: 0.2,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    color: "#000000",
    url: "https://twitter.com",
    position: [3, 1.5, 0.5] as [number, number, number],
    icon: Twitter,
    delay: 0.4,
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    url: "https://facebook.com",
    position: [-1.5, -0.5, 2] as [number, number, number],
    icon: Facebook,
    delay: 0.6,
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    url: "https://youtube.com",
    position: [2, -1, 1.5] as [number, number, number],
    icon: Youtube,
    delay: 0.8,
  },
];

interface SocialNodeProps {
  data: typeof SOCIAL_LINKS[0];
}

function SocialNode({ data }: SocialNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const [floatingOffsets] = useState(() => ({
    xOffset: Math.random() * Math.PI * 2,
    yOffset: Math.random() * Math.PI * 2,
    zOffset: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 0.5
  }));
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Gentle floating translation (bobbing) instead of rotating on its own axis
    meshRef.current.position.y = data.position[1] + Math.sin(time * floatingOffsets.speed + floatingOffsets.yOffset) * 0.3;
    meshRef.current.position.x = data.position[0] + Math.cos(time * floatingOffsets.speed * 0.8 + floatingOffsets.xOffset) * 0.2;
    meshRef.current.position.z = data.position[2] + Math.sin(time * floatingOffsets.speed * 1.2 + floatingOffsets.zOffset) * 0.2;

    // Very subtle tilting (not full revolution)
    meshRef.current.rotation.x = Math.sin(time * 0.5 + floatingOffsets.xOffset) * 0.1;
    meshRef.current.rotation.y = Math.sin(time * 0.6 + floatingOffsets.yOffset) * 0.1;
    
    // Smooth scaling on hover using lerp
    const targetScale = hovered ? 1.1 : 0.8; // Base scale made smaller (0.8)
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const IconComponent = data.icon;

  return (
    <Float speed={1} rotationIntensity={0} floatIntensity={0}>
      <mesh 
        ref={meshRef} 
        position={data.position}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={() => {
          // Open social link in new tab
          window.open(data.url, '_blank');
        }}
      >
        {/* 3D App Icon Base */}
        <RoundedBox args={[1.5, 1.5, 0.3]} radius={0.3} smoothness={4}>
          <meshPhysicalMaterial 
            color={data.id === 'twitter' ? '#222222' : data.color}
            metalness={0.5}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={data.id === 'twitter' ? '#000000' : data.color}
            emissiveIntensity={hovered ? 0.4 : 0.1}
          />
        </RoundedBox>

        {/* HTML UI Attached to the 3D surface */}
        <Html 
          transform 
          position={[0, 0, 0.16]} 
          occlude
          pointerEvents="none"
        >
          <div className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${hovered ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : ''}`}>
             {data.id === 'instagram' ? (
                // Custom gradient for Instagram visually
                 <div className="p-2 rounded-[14px] bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4]">
                     <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                 </div>
             ) : (
                 <IconComponent className="w-14 h-14 text-white drop-shadow-md" strokeWidth={1.5} />
             )}
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

// Background particle ecosystem
function AmbientParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particlesCount = 100;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < particlesCount; i++) {
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 10 - 5;
        temp.push({ x, y, z });
    }
    return temp;
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * 0.2 + i) * 0.5, 
        p.y + Math.cos(time * 0.2 + i) * 0.5, 
        p.z
      );
      dummy.scale.setScalar(0.03);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particlesCount]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
    </instancedMesh>
  );
}

export default function GrowthEngine3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={["#050505"]} />
      
      {/* Premium lighting setup */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <spotLight position={[10, 20, 10]} intensity={2} color="#ffffff" angle={0.5} penumbra={1} castShadow />
      <spotLight position={[-10, -10, 5]} intensity={1.5} color="#ffffff" angle={0.5} penumbra={1} />
      
      {/* Central glow */}
      <pointLight position={[0, 0, -2]} intensity={2} color="#ffffff" distance={10} />

      <group position={[0, -0.5, 0]}>
        {SOCIAL_LINKS.map((link) => (
          <SocialNode key={link.id} data={link} />
        ))}
      </group>

      <AmbientParticles />

      {/* Ground shadow */}
      <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="#000000" />
      <Environment preset="city" />
    </Canvas>
  );
}
