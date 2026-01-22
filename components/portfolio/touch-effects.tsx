"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TouchParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: "square" | "circle" | "ring";
}

const COLORS = ["#FF007A", "#FFD600", "#2E5BFF", "#00FF88", "#A855F7"];
const SHAPES: TouchParticle["shape"][] = ["square", "circle", "ring"];

export function TouchEffects() {
  const [particles, setParticles] = useState<TouchParticle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const checkMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: TouchParticle[] = [];
    const count = 5 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 8 + Math.random() * 16,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 800);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        createParticles(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, [isMobile, createParticles]);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 0, 
              opacity: 1,
              rotate: 0
            }}
            animate={{ 
              scale: [0, 1.2, 0],
              opacity: [1, 0.8, 0],
              rotate: Math.random() * 180 - 90,
              x: particle.x + (Math.random() - 0.5) * 60,
              y: particle.y + (Math.random() - 0.5) * 60,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 border-2 border-foreground"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.shape !== "ring" ? particle.color : "transparent",
              borderColor: particle.color,
              borderRadius: particle.shape === "circle" || particle.shape === "ring" ? "50%" : 0,
              borderWidth: particle.shape === "ring" ? 3 : 2,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
