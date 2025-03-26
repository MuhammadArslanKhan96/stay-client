import React, { CSSProperties } from "react";

type LoaderVariant = "spinner" | "dots" | "bar" | "pulse";
type LoaderSize = "sm" | "md" | "lg";
type LoaderPosition = "center" | "top" | "bottom" | "top-right" | "bottom-left";

interface GlobalLoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  color?: string;
  position?: LoaderPosition;
  overlayColor?: string;
  message?: string;
  visible: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  variant = "spinner",
  size = "md",
  color = "#3b82f6", // blue-500
  position = "center",
  overlayColor = "rgba(0, 0, 0, 0.2)",
  message,
  visible = true,
}) => {
  if (!visible) return null;

  // Size presets
  const sizePresets = {
    sm: {
      loaderSize: 16,
      dotSize: 6,
      barHeight: 2,
      fontSize: "12px",
    },
    md: {
      loaderSize: 32,
      dotSize: 8,
      barHeight: 3,
      fontSize: "14px",
    },
    lg: {
      loaderSize: 48,
      dotSize: 10,
      barHeight: 4,
      fontSize: "16px",
    },
  };

  // Position styles
  const positionStyles: Record<LoaderPosition, CSSProperties> = {
    center: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: overlayColor,
    },
    top: {
      position: "fixed",
      top: "16px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottom: {
      position: "fixed",
      bottom: "16px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "top-right": {
      position: "fixed",
      top: "16px",
      right: "16px",
    },
    "bottom-left": {
      position: "fixed",
      bottom: "16px",
      left: "16px",
    },
  };

  // Animation keyframes as style tag
  const animationStyles = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes progress {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }
  `;

  const renderLoader = () => {
    const currentSize = sizePresets[size];

    switch (variant) {
      case "spinner":
        return (
          <div
            style={{
              width: `${currentSize.loaderSize}px`,
              height: `${currentSize.loaderSize}px`,
              border: `2px solid ${color}`,
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        );
      case "dots":
        return (
          <div
            style={{
              display: "flex",
              gap: `${currentSize.dotSize}px`,
              height: `${currentSize.loaderSize}px`,
              alignItems: "flex-end",
            }}
          >
            {[0, 0.2, 0.4].map((delay) => (
              <div
                key={delay}
                style={{
                  width: `${currentSize.dotSize}px`,
                  height: `${currentSize.dotSize}px`,
                  backgroundColor: color,
                  borderRadius: "50%",
                  animation: `bounce 0.8s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>
        );
      case "bar":
        return (
          <div
            style={{
              width: "120px",
              height: `${currentSize.barHeight}px`,
              backgroundColor: `${color}20`,
              overflow: "hidden",
              borderRadius: "2px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: color,
                transformOrigin: "left",
                animation: "progress 1.5s ease-in-out infinite",
              }}
            />
          </div>
        );
      case "pulse":
        return (
          <div
            style={{
              width: `${currentSize.loaderSize}px`,
              height: `${currentSize.loaderSize}px`,
              backgroundColor: color,
              borderRadius: "50%",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div style={positionStyles[position]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {renderLoader()}
          {message && (
            <span
              style={{
                color,
                fontWeight: "500",
              }}
            >
              {message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default GlobalLoader;
