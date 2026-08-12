import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Decal,
  Float,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  const [decal, setDecal] = useState(null);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const { pointer } = useThree();

  // Smoothly tilt the icon toward the cursor and lift it slightly on hover —
  // an interactive premium touch that never spins the icon out of view.
  useFrame(() => {
    if (!groupRef.current) return;

    const targetX = hovered ? pointer.y * 0.5 : 0;
    const targetY = hovered ? pointer.x * 0.5 : 0;
    const targetScale = hovered ? 1.12 : 1;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.08
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.08
    );
    groupRef.current.scale.x = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      0.1
    );
    groupRef.current.scale.y = THREE.MathUtils.lerp(
      groupRef.current.scale.y,
      targetScale,
      0.1
    );
    groupRef.current.scale.z = THREE.MathUtils.lerp(
      groupRef.current.scale.z,
      targetScale,
      0.1
    );
  });

  useEffect(() => {
    let cancelled = false;
    let texture = null;

    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      if (cancelled) return;

      texture = new THREE.Texture(image);

      // Icon images are not power-of-two sized. Without these settings,
      // some browsers/GPUs silently fail to sample the texture (mipmaps +
      // repeat wrapping require POT textures), so the decal never appears.
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      texture.needsUpdate = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;

      setDecal(texture);
    };

    image.onerror = (error) => {
      console.error("Failed to load technology icon:", error);
      console.error("Icon URL:", imgUrl);

      if (!cancelled) {
        setDecal(null);
      }
    };

    image.src = imgUrl;

    return () => {
      cancelled = true;

      if (texture) {
        texture.dispose();
      }
    };
  }, [imgUrl]);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0}
      floatIntensity={1.1}
    >
      <ambientLight intensity={0.4} />

      <directionalLight
        position={[0, 0, 5]}
        intensity={1.5}
      />

      <pointLight
        position={[0, 0, 3]}
        intensity={1}
      />

      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh
          castShadow
          receiveShadow
          scale={2.75}
        >
          <icosahedronGeometry args={[1, 1]} />

          <meshStandardMaterial
            color="#ffffff"
            emissive="#4F7FFF"
            emissiveIntensity={hovered ? 0.25 : 0}
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />

          {decal && (
            <Decal
              position={[0, 0, 1]}
              rotation={[2 * Math.PI, 0, 6.25]}
              scale={1.15}
              map={decal}
              flatShading
            />
          )}
        </mesh>
      </group>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;