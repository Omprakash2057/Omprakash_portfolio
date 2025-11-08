import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Torus, Box, Octahedron } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';

const AnimatedSphere = ({ position, color, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[0, 2]}
    >
      <Sphere
        ref={meshRef}
        position={position}
        args={[1, 32, 32]}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// New Professional Geometric Elements
const AnimatedTorus = ({ position, color, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.5} floatIntensity={1.5}>
      <Torus ref={meshRef} position={position} args={[1.2, 0.4, 16, 32]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Torus>
    </Float>
  );
};

const AnimatedBox = ({ position, color, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <Box ref={meshRef} position={position} args={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          metalness={0.6}
          roughness={0.3}
          wireframe={false}
        />
      </Box>
    </Float>
  );
};

const AnimatedOctahedron = ({ position, color, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * speed) * 0.6;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={1.5} floatIntensity={2.5}>
      <Octahedron ref={meshRef} position={position} args={[1.3]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Octahedron>
    </Float>
  );
};

const ParticleField = () => {
  const { isDarkMode } = useTheme();
  const particleCount = 100;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        scale: Math.random() * 0.1 + 0.05
      });
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={isDarkMode ? '#ffffff' : '#3b82f6'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </>
  );
};

const Scene3D = () => {
  const { isDarkMode } = useTheme();

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      opacity: 0.8
    }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Enhanced Lighting System */}
        <ambientLight intensity={isDarkMode ? 0.2 : 0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={isDarkMode ? 0.6 : 0.8} 
          color={isDarkMode ? '#ffffff' : '#fbbf24'}
        />
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={isDarkMode ? 0.4 : 0.3}
          color={isDarkMode ? '#8b5cf6' : '#3b82f6'}
        />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.3}
          color={isDarkMode ? '#06b6d4' : '#10b981'}
        />

        {/* Animated Spheres */}
        <AnimatedSphere 
          position={[-4, 3, -2]} 
          color={isDarkMode ? '#8b5cf6' : '#3b82f6'} 
          speed={1.2} 
        />
        <AnimatedSphere 
          position={[4, -2, -3]} 
          color={isDarkMode ? '#06b6d4' : '#8b5cf6'} 
          speed={0.8} 
        />
        <AnimatedSphere 
          position={[0, 4, -5]} 
          color={isDarkMode ? '#10b981' : '#06b6d4'} 
          speed={1.5} 
        />

        {/* New Professional Geometric Elements */}
        <AnimatedTorus
          position={[-2, -3, -1]}
          color={isDarkMode ? '#f59e0b' : '#f97316'}
          speed={0.6}
        />
        <AnimatedTorus
          position={[3, 2, -4]}
          color={isDarkMode ? '#ec4899' : '#be185d'}
          speed={1.1}
        />

        <AnimatedBox
          position={[-5, 0, -3]}
          color={isDarkMode ? '#06b6d4' : '#0891b2'}
          speed={0.9}
        />
        <AnimatedBox
          position={[2, -4, -2]}
          color={isDarkMode ? '#10b981' : '#059669'}
          speed={1.3}
        />

        <AnimatedOctahedron
          position={[0, -1, -6]}
          color={isDarkMode ? '#8b5cf6' : '#7c3aed'}
          speed={0.7}
        />
        <AnimatedOctahedron
          position={[-3, 2, -4]}
          color={isDarkMode ? '#f59e0b' : '#d97706'}
          speed={1.4}
        />

        <ParticleField />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
