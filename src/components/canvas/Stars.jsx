import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Responsive particle-count tiers. Mobile gets none at all (the section
// backgrounds already carry the "premium" feel via the grid/gradient/orb
// CSS layers), tablet gets a light pass, desktop gets the full field.
const getParticleCount = () => {
  if (typeof window === "undefined") return 2000;
  const width = window.innerWidth;
  if (width < 640) return 0;
  if (width < 1024) return 1200;
  return 2000;
};

const Stars = ({ count }) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(count), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [particleCount, setParticleCount] = useState(getParticleCount);

  useEffect(() => {
    let frame;
    const handleResize = () => {
      // Debounce resize with rAF so we don't thrash React state while the
      // user is actively resizing / rotating the device.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setParticleCount(getParticleCount()));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Nothing to mount at all on mobile — skip the Canvas (and its
  // continuous render loop / WebGL context) entirely rather than hiding
  // it with CSS.
  if (particleCount === 0) return null;

  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Stars count={particleCount} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
