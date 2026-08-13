import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Decal,
  Float,
  Preload,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

/* -------------------------------------------------------
   Premium interactive technology sphere
------------------------------------------------------- */

const Ball = ({ imgUrl }) => {
  const [decal, setDecal] = useState(null);
  const [hovered, setHovered] = useState(false);

  const groupRef = useRef();
  const meshRef = useRef();
  const glowRef = useRef();

  const { pointer } = useThree();

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  /* -------------------------------------------------------
     Load icon texture safely
  ------------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;
    let texture = null;

    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => {
      if (cancelled) return;

      texture = new THREE.Texture(image);

      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.needsUpdate = true;

      setDecal(texture);
    };

    image.onerror = () => {
      console.warn("Technology icon could not be loaded:", imgUrl);

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

  /* -------------------------------------------------------
     Mouse tracking
  ------------------------------------------------------- */

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    /*
      Smooth mouse values.
      pointer.x/y are already normalized by R3F.
    */
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      pointer.x,
      0.08
    );

    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      pointer.y,
      0.08
    );

    const mx = mouse.current.x;
    const my = mouse.current.y;

    /* ---------------------------------------------------
       Premium cursor parallax
    --------------------------------------------------- */

    const targetRotationX =
      -my * (hovered ? 0.55 : 0.22);

    const targetRotationY =
      mx * (hovered ? 0.65 : 0.25);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.08
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.08
    );

    /* ---------------------------------------------------
       Magnetic movement
    --------------------------------------------------- */

    const targetX = mx * (hovered ? 0.16 : 0.06);
    const targetY = my * (hovered ? 0.12 : 0.04);

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.06
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.06
    );

    /* ---------------------------------------------------
       Hover scale
    --------------------------------------------------- */

    const targetScale = hovered ? 1.13 : 1;

    const currentScale = groupRef.current.scale.x;

    const nextScale = THREE.MathUtils.lerp(
      currentScale,
      targetScale,
      0.08
    );

    groupRef.current.scale.set(
      nextScale,
      nextScale,
      nextScale
    );

    /* ---------------------------------------------------
       Subtle idle rotation
    --------------------------------------------------- */

    meshRef.current.rotation.z +=
      hovered ? 0.0008 : 0.0018;

    /* ---------------------------------------------------
       Dynamic glow
    --------------------------------------------------- */

    if (glowRef.current) {
      const targetGlow = hovered ? 0.32 : 0.08;

      glowRef.current.material.opacity =
        THREE.MathUtils.lerp(
          glowRef.current.material.opacity,
          targetGlow,
          0.08
        );

      const glowScale = hovered ? 1.35 : 1.05;

      glowRef.current.scale.x = THREE.MathUtils.lerp(
        glowRef.current.scale.x,
        glowScale,
        0.08
      );

      glowRef.current.scale.y = THREE.MathUtils.lerp(
        glowRef.current.scale.y,
        glowScale,
        0.08
      );
    }
  });

  return (
    <Float
      speed={1.35}
      rotationIntensity={0.12}
      floatIntensity={0.85}
    >
      {/* -------------------------------------------------
          Lighting
      ------------------------------------------------- */}

      <ambientLight intensity={0.35} />

      <hemisphereLight
        intensity={0.45}
        groundColor="#050509"
      />

      <directionalLight
        position={[3, 5, 6]}
        intensity={2}
      />

      <pointLight
        position={[-3, 2, 4]}
        intensity={1.2}
        color="#4F7FFF"
      />

      <pointLight
        position={[3, -2, 2]}
        intensity={0.7}
        color="#8B5CF6"
      />

      {/* -------------------------------------------------
          Interactive group
      ------------------------------------------------- */}

      <group
        ref={groupRef}
        onPointerEnter={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        {/* ------------------------------------------------
            Outer glow sphere
        ------------------------------------------------ */}

        <mesh ref={glowRef} scale={1.05}>
          <sphereGeometry args={[1.08, 32, 32]} />

          <meshBasicMaterial
            color="#4F7FFF"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* ------------------------------------------------
            Main 3D object
        ------------------------------------------------ */}

        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          scale={2.75}
        >
          <icosahedronGeometry args={[1, 2]} />

          <meshStandardMaterial
            color="#f8f9ff"
            roughness={0.28}
            metalness={0.18}
            emissive="#4F7FFF"
            emissiveIntensity={hovered ? 0.18 : 0.025}
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />

          {/* ------------------------------------------------
              Technology icon
          ------------------------------------------------ */}

          {decal && (
            <Decal
              position={[0, 0, 1]}
              rotation={[2 * Math.PI, 0, 6.25]}
              scale={1.05}
              map={decal}
              flatShading
            />
          )}
        </mesh>

        {/* ------------------------------------------------
            Small orbital light
        ------------------------------------------------ */}

        {hovered && (
          <mesh
            rotation={[
              Math.PI / 2,
              0,
              0,
            ]}
          >
            <torusGeometry args={[1.25, 0.008, 8, 64]} />

            <meshBasicMaterial
              color="#4F7FFF"
              transparent
              opacity={0.45}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

/* -------------------------------------------------------
   Canvas
------------------------------------------------------- */

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0, 5],
        fov: 42,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      shadows
    >
      <Suspense fallback={<CanvasLoader />}>
        <Ball imgUrl={icon} />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.25}
          scale={4}
          blur={2.5}
          far={3}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;