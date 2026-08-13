import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  const computerRef = useRef();
  const { invalidate } = useThree();

  // Mouse position across the entire browser
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event) => {
      mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = (event.clientY / window.innerHeight) * 2 - 1;
      // The Canvas uses frameloop="demand" for performance, which only
      // re-renders on explicit invalidation. Since this listener is on
      // `window` rather than wired through R3F's own event system, we
      // have to manually request a frame here or the model never redraws
      // in response to the mouse.
      invalidate();
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, invalidate]);

  useFrame((state) => {
    if (!computerRef.current || isMobile) return;

    const x = mouseX.current;
    const y = mouseY.current;

    /*
     * ------------------------------------------------
     * Premium mouse interaction
     * ------------------------------------------------
     */

    // Horizontal movement
    const targetX = 4.2 + x * 0.55;

    // Very subtle vertical movement
    const targetY = -3.25 - y * 0.08;

    // Smooth rotation
    const targetRotationY = -0.2 + x * 0.18;
    const targetRotationX = -0.01 - y * 0.035;

    // Smooth position interpolation
    computerRef.current.position.x +=
      (targetX - computerRef.current.position.x) * 0.045;

    computerRef.current.position.y +=
      (targetY - computerRef.current.position.y) * 0.045;

    // Smooth rotation interpolation
    computerRef.current.rotation.y +=
      (targetRotationY - computerRef.current.rotation.y) * 0.045;

    computerRef.current.rotation.x +=
      (targetRotationX - computerRef.current.rotation.x) * 0.045;

    /*
     * ------------------------------------------------
     * Subtle floating effect
     * ------------------------------------------------
     */

    const floatingY =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.025;

    computerRef.current.position.y += floatingY * 0.08;
  });

  return (
    <group>
      {/* Soft ambient lighting */}
      <hemisphereLight
        intensity={0.2}
        groundColor="#000000"
      />

      {/* Main premium light */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.15}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Front fill */}
      <pointLight
        position={[5, 5, 5]}
        intensity={1.2}
      />

      {/* Subtle side light */}
      <pointLight
        position={[-5, 2, 3]}
        intensity={0.5}
      />

      <primitive
        ref={computerRef}
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.52}
        position={
          isMobile
            ? [1.2, -3, -2.2]
            : [4.2, -3.25, -1.5]
        }
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 500px)"
    );

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener(
      "change",
      handleMediaQueryChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleMediaQueryChange
      );
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 1.5]}
      camera={{
        position: [20, 3, 5],
        fov: 25,
      }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;