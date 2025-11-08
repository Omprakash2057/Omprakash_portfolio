import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { 
  Environment, 
  Sky, 
  PerspectiveCamera,
  OrbitControls,
  Float,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// Custom Water Shader Material
const WaterMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#0077B6'),
    deepColor: new THREE.Color('#001F3F'),
    sunDirection: new THREE.Vector3(0.7, 0.7, 0.5),
    distortionScale: 3.7,
    alpha: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float distortionScale;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    float noise(vec3 point) {
      float r = 0.0;
      for (int i = 0; i < 16; i++) {
        vec3 D = (fract(point) - 0.5) * 2.0;
        r += sin(dot(sin(D), vec3(1.0, 2.7, 1.5))) * 0.5 + 0.5;
        point *= 2.0;
      }
      return r / 16.0;
    }
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Create wave displacement
      float wave1 = noise(vec3(position.x * 0.1 + time * 0.5, position.z * 0.1, time * 0.2)) * distortionScale;
      float wave2 = noise(vec3(position.x * 0.05 + time * 0.3, position.z * 0.05, time * 0.1)) * distortionScale * 0.5;
      
      vec3 newPosition = position;
      newPosition.y += wave1 + wave2;
      
      vPosition = newPosition;
      vNormal = normalize(normalMatrix * normal);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform vec3 deepColor;
    uniform vec3 sunDirection;
    uniform float alpha;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec3 lightDirection = normalize(sunDirection);
      float lightDot = dot(vNormal, lightDirection);
      
      // Water color mixing
      vec3 waterColor = mix(deepColor, color, lightDot * 0.5 + 0.5);
      
      // Add caustics effect
      float caustics = sin(vPosition.x * 20.0 + time * 2.0) * sin(vPosition.z * 20.0 + time * 2.0);
      caustics = max(0.0, caustics) * 0.3;
      
      waterColor += vec3(caustics * 0.5, caustics * 0.7, caustics);
      
      // Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 2.0);
      
      waterColor = mix(waterColor, vec3(0.9, 0.95, 1.0), fresnel * 0.3);
      
      gl_FragColor = vec4(waterColor, alpha);
    }
  `
);

extend({ WaterMaterial });

// Ocean Surface Component
function OceanSurface({ position = [0, 0, 0] }) {
  const mesh = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200, 512, 512]} />
      <waterMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating Particles Component
function UnderwaterParticles() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 100,
          Math.random() * 50 - 25,
          (Math.random() - 0.5) * 100,
        ],
        scale: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {particles.map((particle, index) => (
        <Float
          key={index}
          position={particle.position}
          rotationIntensity={0.1}
          floatIntensity={particle.speed * 10}
          speed={particle.speed * 5}
        >
          <mesh>
            <sphereGeometry args={[particle.scale, 8, 8]} />
            <meshBasicMaterial
              color="#90E0EF"
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Bubble System Component
function BubbleSystem() {
  const bubbles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 80,
          -20 + Math.random() * -10,
          (Math.random() - 0.5) * 80,
        ],
        scale: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {bubbles.map((bubble, index) => (
        <Float
          key={index}
          position={bubble.position}
          rotationIntensity={0.2}
          floatIntensity={bubble.speed * 20}
          speed={bubble.speed * 8}
        >
          <mesh>
            <sphereGeometry args={[bubble.scale, 16, 16]} />
            <meshBasicMaterial
              color="#CAF0F8"
              transparent
              opacity={0.4}
              side={THREE.BackSide}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Volumetric Light Rays Component
function LightRays() {
  const raysRef = useRef();

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={raysRef} position={[0, 20, 0]}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[Math.sin(i * Math.PI / 4) * 10, 0, Math.cos(i * Math.PI / 4) * 10]}
          rotation={[0, i * Math.PI / 4, 0]}
        >
          <cylinderGeometry args={[0.1, 2, 40, 8]} />
          <meshBasicMaterial
            color="#90E0EF"
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Ocean Scene Component
export default function OceanScene({ isUnderwater = false }) {
  const cameraRef = useRef();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, isUnderwater ? -10 : 5, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Camera Controls */}
        <PerspectiveCamera ref={cameraRef} makeDefault />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          enableRotate={false}
          target={[0, 0, 0]}
        />

        {/* Lighting */}
        <ambientLight intensity={isUnderwater ? 0.3 : 0.6} color="#90E0EF" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={isUnderwater ? 0.5 : 1}
          color="#CAF0F8"
          castShadow
        />

        {/* Environment */}
        {!isUnderwater && (
          <>
            <Sky 
              sunPosition={[100, 20, 100]} 
              inclination={0.6}
              azimuth={0.1}
            />
            <Environment preset="sunset" />
          </>
        )}

        {/* Ocean Surface */}
        <OceanSurface position={[0, 0, 0]} />

        {/* Underwater Effects */}
        {isUnderwater && (
          <>
            <UnderwaterParticles />
            <BubbleSystem />
            <LightRays />
            <Sparkles
              count={100}
              scale={[50, 20, 50]}
              size={2}
              speed={0.3}
              color="#90E0EF"
            />
            <fog attach="fog" args={['#001F3F', 10, 100]} />
          </>
        )}
      </Canvas>
    </div>
  );
}