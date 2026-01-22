"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  shape: "square" | "circle" | "diamond";
  color: string;
  size: number;
  rotation: number;
}

const COLORS = ["#FF007A", "#FFD600", "#2E5BFF", "#00FF88", "#A855F7"];
const SHAPES: Particle["shape"][] = ["square", "circle", "diamond"];

export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const addParticle = useCallback((e: MouseEvent) => {
    if (!isDesktop) return;
    
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 12 + 8,
      rotation: Math.random() * 360,
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    let lastTime = 0;
    const throttledHandler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 50) {
        lastTime = now;
        addParticle(e);
      }
    };

    window.addEventListener("mousemove", throttledHandler);
    return () => window.removeEventListener("mousemove", throttledHandler);
  }, [isDesktop, addParticle]);

  // Auto-remove particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);

    return () => clearTimeout(timer);
  }, [particles]);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 1, 
              scale: 1,
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
              rotate: particle.rotation,
            }}
            animate={{ 
              opacity: 0,
              scale: 0.5,
              y: particle.y - particle.size / 2 - 30,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
            }}
          >
            <ShapeRenderer shape={particle.shape} color={particle.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ShapeRenderer({ shape, color }: { shape: Particle["shape"]; color: string }) {
  const baseStyle = {
    width: "100%",
    height: "100%",
    border: "2px solid #000",
    boxShadow: "2px 2px 0px 0px #000",
  };

  switch (shape) {
    case "square":
      return <div style={{ ...baseStyle, backgroundColor: color }} />;
    case "circle":
      return <div style={{ ...baseStyle, backgroundColor: color, borderRadius: "50%" }} />;
    case "diamond":
      return (
        <div 
          style={{ 
            ...baseStyle, 
            backgroundColor: color, 
            transform: "rotate(45deg) scale(0.7)",
          }} 
        />
      );
    default:
      return null;
  }
}
