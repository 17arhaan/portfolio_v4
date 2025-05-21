import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Number of particles
const PARTICLE_COUNT = 48;

function Particles({ mouse }: { mouse: { x: number; y: number } }) {
  // Memoize initial positions and random factors for each particle
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => {
      // Start near the center, randomize direction and speed
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.5 + 0.1;
      const ySpeed = Math.random() * 0.008 + 0.012;
      const xzSpeed = Math.random() * 0.002 + 0.001;
      const size = Math.random() * 0.08 + 0.04;
      const phase = Math.random() * Math.PI * 2;
      return { angle, radius, ySpeed, xzSpeed, size, phase };
    });
  }, []);

  // Store y positions for looping
  const yPositions = useRef(Array(PARTICLE_COUNT).fill(0));

  useFrame((state) => {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Animate upward, loop back to bottom
      yPositions.current[i] += particles[i].ySpeed;
      if (yPositions.current[i] > 1.8) yPositions.current[i] = 0;
    }
  });

  return (
    <group>
      {particles.map((p, i) => {
        // Calculate position
        const x = Math.cos(p.angle + p.phase + mouse.x * 0.7) * p.radius + Math.sin(Date.now() * 0.0002 + i) * 0.04;
        const y = yPositions.current[i] - 0.7 + Math.sin(Date.now() * 0.0005 + i) * 0.03;
        const z = Math.sin(p.angle + p.phase + mouse.y * 0.7) * p.radius + Math.cos(Date.now() * 0.0002 + i) * 0.04;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[p.size, 16, 16]} />
            <meshPhysicalMaterial
              color="#fff"
              transparent
              opacity={0.7}
              roughness={0.3}
              metalness={0.2}
              clearcoat={0.7}
              emissive="#fff"
              emissiveIntensity={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}

const Contact3DAnimation: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ width: '100%', height: 220, maxWidth: 400 }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={0.5} />
        <Particles mouse={mouse} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Contact3DAnimation; 