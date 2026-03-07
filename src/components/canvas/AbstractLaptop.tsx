"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

export default function AbstractLaptop() {
  const laptopRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 - 0.5;
      laptopRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <group ref={laptopRef} position={[2, 0, 0]} rotation={[0.2, -0.5, 0]}>
      {/* Base */}
      <RoundedBox args={[6, 0.2, 4]} radius={0.1} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox args={[6, 4, 0.2]} radius={0.1} position={[0, 1.9, -1.9]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
        {/* Screen Content */}
        <Html
          transform
          wrapperClass="pointer-events-none"
          distanceFactor={5}
          position={[0, 0, 0.11]}
        >
          <div className="w-[780px] h-[500px] bg-[#0b0b0b] border border-white/5 rounded-lg p-6 flex flex-col gap-6 text-white font-sans" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'}}>
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4">
               <div className="text-2xl font-bold tracking-tighter">AmplifyCO.</div>
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
               </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-6">
               <div className="col-span-2 space-y-6">
                 <div className="h-40 bg-white/5 rounded-xl border border-white/5 flex items-end p-4 relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-sm text-gray-400">Monthly Traffic</div>
                    <div className="flex gap-3 items-end w-full h-full pt-8">
                       {[30, 45, 40, 60, 50, 80, 75, 100].map((h, i) => (
                         <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/50 to-indigo-400/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
                       ))}
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="h-28 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                       <span className="text-gray-400 text-sm">Conversion Rate</span>
                       <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">12.8%</span>
                    </div>
                    <div className="h-28 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                       <span className="text-gray-400 text-sm">Follower Growth</span>
                       <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">+4,209</span>
                    </div>
                 </div>
               </div>
               <div className="col-span-1 border-l border-white/5 pl-6 space-y-4">
                  <div className="text-sm text-gray-400 mb-2">Recent Leads</div>
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-12 w-full bg-white/5 rounded-lg border border-white/5 flex items-center px-3 gap-3">
                       <div className="w-6 h-6 rounded-full bg-indigo-500/30"></div>
                       <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </Html>
      </RoundedBox>
    </group>
  );
}
