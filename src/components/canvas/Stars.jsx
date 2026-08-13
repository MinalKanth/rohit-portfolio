import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Responsive particle-count tiers, checked against fixed breakpoints (not
// raw window width) so mobile browser chrome show/hide during scroll
// doesn't repeatedly flip this.
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
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  // Re-check the breakpoint tier only on real breakpoint crossings, via
  // matchMedia, instead of a raw "resize" listener — iOS Safari fires
  // resize repeatedly while scrolling (address bar collapsing), which
  // was causing unnecessary churn here.
  useEffect(() => {
    const mqTablet = window.matchMedia("(min-width: 640px)");
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const update = () => setParticleCount(getParticleCount());
    mqTablet.addEventListener("change", update);
    mqDesktop.addEventListener("change", update);
    return () => {
      mqTablet.removeEventListener("change", update);
      mqDesktop.removeEventListener("change", update);
    };
  }, []);

  // Only run the render loop while this canvas is actually on screen.
  // Previously this (and the second instance near Contact) rendered
  // continuously for the entire session regardless of scroll position —
  // the main cause of ongoing CPU/GPU drain and perceived lag.
  useEffect(() => {
    if (!containerRef.current || particleCount === 0) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [particleCount]);

  // Nothing to mount at all on mobile — skip the Canvas (and its WebGL
  // context) entirely rather than hiding it with CSS.
  if (particleCount === 0) return null;

  return (
    <div ref={containerRef} className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <Stars count={particleCount} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
