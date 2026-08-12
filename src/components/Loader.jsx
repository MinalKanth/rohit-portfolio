import React from "react";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        width: "180px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pointerEvents: "none",
      }}
    >
      {/* Premium loader */}
      <div
        style={{
          position: "relative",
          width: "72px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer rotating ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(79,127,255,0.15)",
            borderTop: "1px solid #4F7FFF",
            borderRight: "1px solid rgba(79,127,255,0.45)",
            animation: "loaderSpin 1.2s linear infinite",
            boxShadow: "0 0 25px rgba(79,127,255,0.15)",
          }}
        />

        {/* Inner rotating ring */}
        <div
          style={{
            position: "absolute",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.75)",
            animation: "loaderSpinReverse 1.8s linear infinite",
          }}
        />

        {/* Core glow */}
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#4F7FFF",
            boxShadow:
              "0 0 8px #4F7FFF, 0 0 20px rgba(79,127,255,0.8), 0 0 40px rgba(79,127,255,0.35)",
            animation: "loaderPulse 1.5s ease-in-out infinite",
          }}
        />

        {/* Orbiting dot */}
        <div
          style={{
            position: "absolute",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#ffffff",
            boxShadow: "0 0 10px rgba(255,255,255,0.9)",
            animation: "loaderOrbit 2s linear infinite",
          }}
        />
      </div>

      {/* Loading text */}
      <div
        style={{
          marginTop: "22px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "7px",
        }}
      >
        <span
          style={{
            color: "#F5F5F7",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Initializing
        </span>

        <div
          style={{
            width: "120px",
            height: "2px",
            borderRadius: "999px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, #4F7FFF, #8B5CF6, #4F7FFF)",
              boxShadow: "0 0 12px rgba(79,127,255,0.7)",
              transition: "width 0.25s ease-out",
            }}
          />
        </div>

        <span
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.12em",
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>

      <style>
        {`
          @keyframes loaderSpin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes loaderSpinReverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }

          @keyframes loaderPulse {
            0%, 100% {
              transform: scale(0.75);
              opacity: 0.65;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
          }

          @keyframes loaderOrbit {
            from {
              transform: rotate(0deg) translateX(29px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(29px) rotate(-360deg);
            }
          }
        `}
      </style>
    </Html>
  );
};

export default CanvasLoader;