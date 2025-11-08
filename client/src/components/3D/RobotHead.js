import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const RobotHeadMesh = ({ mousePosition }) => {
  const headRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();

  useFrame((state) => {
    if (headRef.current) {
      // Calculate rotation based on mouse position
      const x = (mousePosition.x / window.innerWidth) * 2 - 1;
      const y = -(mousePosition.y / window.innerHeight) * 2 + 1;
      
      // Smooth rotation following mouse
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        x * 0.3,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        y * 0.2,
        0.05
      );
    }

    // Animate eyes to follow mouse
    if (eyeLeftRef.current && eyeRightRef.current) {
      const x = (mousePosition.x / window.innerWidth) * 2 - 1;
      const y = -(mousePosition.y / window.innerHeight) * 2 + 1;
      
      eyeLeftRef.current.position.x = x * 0.1;
      eyeLeftRef.current.position.y = y * 0.1;
      eyeRightRef.current.position.x = x * 0.1;
      eyeRightRef.current.position.y = y * 0.1;
    }
  });

  return (
    <group ref={headRef}>
      {/* Robot Head - Main Body */}
      <Box args={[2, 2.2, 1.8]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#2563eb" 
          metalness={0.8} 
          roughness={0.2}
        />
      </Box>
      
      {/* Head Top Panel */}
      <Box args={[1.8, 0.2, 1.6]} position={[0, 1.2, 0]}>
        <meshStandardMaterial 
          color="#1e40af" 
          metalness={0.9} 
          roughness={0.1}
        />
      </Box>
      
      {/* Eyes */}
      <group>
        {/* Left Eye */}
        <Sphere ref={eyeLeftRef} args={[0.25]} position={[-0.5, 0.3, 0.9]}>
          <meshStandardMaterial 
            color="#00ff88" 
            emissive="#00ff88"
            emissiveIntensity={0.5}
          />
        </Sphere>
        
        {/* Right Eye */}
        <Sphere ref={eyeRightRef} args={[0.25]} position={[0.5, 0.3, 0.9]}>
          <meshStandardMaterial 
            color="#00ff88" 
            emissive="#00ff88"
            emissiveIntensity={0.5}
          />
        </Sphere>
        
        {/* Eye Sockets */}
        <Cylinder args={[0.35, 0.35, 0.2]} position={[-0.5, 0.3, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1e293b" />
        </Cylinder>
        <Cylinder args={[0.35, 0.35, 0.2]} position={[0.5, 0.3, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1e293b" />
        </Cylinder>
      </group>
      
      {/* Mouth/Speaker Grille */}
      <Box args={[1.2, 0.4, 0.1]} position={[0, -0.5, 0.9]}>
        <meshStandardMaterial color="#1e293b" />
      </Box>
      
      {/* Mouth Lines */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
        <Box key={i} args={[0.05, 0.3, 0.05]} position={[x, -0.5, 0.95]}>
          <meshStandardMaterial color="#374151" />
        </Box>
      ))}
      
      {/* Antennas */}
      <Cylinder args={[0.05, 0.05, 0.8]} position={[-0.6, 1.8, 0]}>
        <meshStandardMaterial color="#6366f1" metalness={1} roughness={0} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.8]} position={[0.6, 1.8, 0]}>
        <meshStandardMaterial color="#6366f1" metalness={1} roughness={0} />
      </Cylinder>
      
      {/* Antenna Tips */}
      <Sphere args={[0.15]} position={[-0.6, 2.3, 0]}>
        <meshStandardMaterial 
          color="#ff0080" 
          emissive="#ff0080"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Sphere args={[0.15]} position={[0.6, 2.3, 0]}>
        <meshStandardMaterial 
          color="#ff0080" 
          emissive="#ff0080"
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {/* Side Panels */}
      <Box args={[0.2, 1.8, 1.4]} position={[-1.1, 0, 0]}>
        <meshStandardMaterial color="#1e40af" metalness={0.7} roughness={0.3} />
      </Box>
      <Box args={[0.2, 1.8, 1.4]} position={[1.1, 0, 0]}>
        <meshStandardMaterial color="#1e40af" metalness={0.7} roughness={0.3} />
      </Box>
    </group>
  );
};

const RobotHead = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow
        />
        <pointLight 
          position={[-5, 5, 5]} 
          intensity={0.5} 
          color="#3b82f6"
        />
        <pointLight 
          position={[5, -5, 5]} 
          intensity={0.5} 
          color="#8b5cf6"
        />
        
        {/* Robot Head */}
        <RobotHeadMesh mousePosition={mousePosition} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 8, 15]} />
      </Canvas>
    </div>
  );
};

export default RobotHead;
