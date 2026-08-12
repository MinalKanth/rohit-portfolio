import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  const [decal, setDecal] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let texture = null;

    const image = new Image();

    image.onload = () => {
      if (cancelled) return;

      texture = new THREE.Texture(image);

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
      speed={1.75}
      rotationIntensity={1}
      floatIntensity={2}
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

      <mesh
        castShadow
        receiveShadow
        scale={2.75}
      >
        <icosahedronGeometry args={[1, 1]} />

        <meshStandardMaterial
          color="#ffffff"
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
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
        />

        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;