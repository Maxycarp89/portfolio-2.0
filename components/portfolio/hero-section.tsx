"use client";

import React from "react"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Briefcase, Box, Code2, Sparkles, Zap, Terminal } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

// Floating Decorative Element
function FloatingElement({ 
  children, 
  delay = 0, 
  duration = 3,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        y: { delay, duration, repeat: Infinity, ease: "easeInOut" }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section ref={containerRef} className="min-h-screen px-4 pt-8 pb-24 relative overflow-hidden lg:px-8 xl:px-16">
      {/* Desktop Layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:min-h-[calc(100vh-6rem)]">
        
        {/* Left Column - Typography & CTA */}
        <div className="relative z-10">
          {/* Mobile: Top decorative row */}
          <div className="flex justify-between items-start mb-8 lg:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-card border-2 border-foreground shadow-brutal flex items-center justify-center"
            >
              <Box className="w-10 h-10" strokeWidth={1} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 5 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="animate-float"
            >
              <div className="bg-primary text-primary-foreground px-8 py-3 border-2 border-foreground shadow-brutal">
                <span className="text-xl font-bold tracking-wider">HELLO</span>
              </div>
            </motion.div>
          </div>

          {/* Desktop: Hello sticker positioned absolutely */}
          <motion.div
            initial={{ opacity: 0, rotate: 0, x: -20 }}
            animate={{ opacity: 1, rotate: -8, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            style={mounted ? { y: y3 } : {}}
            className="hidden lg:block absolute -top-4 -left-4 z-20"
          >
            <div className="bg-primary text-primary-foreground px-10 py-4 border-2 border-foreground shadow-brutal-lg">
              <span className="text-2xl font-bold tracking-wider">HELLO</span>
            </div>
          </motion.div>

          {/* Main Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="space-y-2 mb-12 lg:space-y-4 lg:mb-16 lg:mt-16"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-muted-foreground lg:text-3xl">/</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight">
                <span className="underline-accent">DESIGN</span>
              </h1>
            </div>

            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif italic">&amp;</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-accent">
                <span className="underline-accent">DEVELOP</span>
              </h1>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap lg:gap-4">
              <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">Digital</span>
              <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic font-light">Magic</span>
            </div>
          </motion.div>

          {/* Desktop CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="hidden lg:flex gap-4 mb-12"
          >
            <a 
              href="#projects"
              className="bg-foreground text-card px-8 py-4 border-2 border-foreground shadow-brutal font-bold text-lg hover-brutal inline-flex items-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              VIEW PROJECTS
            </a>
            <a 
              href="#contact"
              className="bg-card text-foreground px-8 py-4 border-2 border-foreground shadow-brutal font-bold text-lg hover-brutal inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              LET&apos;S TALK
            </a>
          </motion.div>

          {/* Tech Stack Bar - Full width on mobile, inline on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-foreground text-card py-4 px-6 -mx-4 flex items-center justify-around mb-12 lg:mx-0 lg:inline-flex lg:gap-8 lg:px-8"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              <span className="font-bold text-sm tracking-wider">REACT</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-secondary" />
              <span className="font-bold text-sm tracking-wider">TYPESCRIPT</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-secondary" />
              <span className="font-bold text-sm tracking-wider">NEXT.JS</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Interactive Cards & Decorative Elements (Desktop) */}
        <div className="relative lg:h-[600px] hidden lg:block" style={{ perspective: "1000px" }}>
          {/* Parallax Layer 1 - Back */}
          <motion.div 
            style={mounted ? { y: y1, opacity } : {}}
            className="absolute inset-0"
          >
            {/* Floating decorative squares */}
            <FloatingElement delay={0.5} duration={4} className="absolute top-8 right-8">
              <div className="w-16 h-16 bg-secondary border-2 border-foreground shadow-brutal rotate-12" />
            </FloatingElement>
            <FloatingElement delay={0.8} duration={3.5} className="absolute bottom-32 left-8">
              <div className="w-12 h-12 bg-primary border-2 border-foreground shadow-brutal -rotate-6" />
            </FloatingElement>
            <FloatingElement delay={1} duration={4.5} className="absolute top-1/3 right-4">
              <div className="w-8 h-8 bg-accent border-2 border-foreground shadow-brutal-sm rotate-45" />
            </FloatingElement>
          </motion.div>

          {/* Parallax Layer 2 - Middle */}
          <motion.div 
            style={mounted ? { y: y2 } : {}}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Box Icon Card */}
            <FloatingElement delay={0.3} duration={3.8} className="absolute top-4 left-4">
              <div className="w-24 h-24 bg-card border-2 border-foreground shadow-brutal flex items-center justify-center">
                <Box className="w-12 h-12" strokeWidth={1} />
              </div>
            </FloatingElement>

            {/* Code snippet decoration */}
            <FloatingElement delay={0.6} duration={4.2} className="absolute bottom-16 right-0">
              <div className="bg-[#0D0D0D] text-[#00FF88] px-4 py-3 border-2 border-foreground shadow-brutal font-mono text-sm">
                <span className="text-primary">const</span> magic = <span className="text-secondary">true</span>;
              </div>
            </FloatingElement>
          </motion.div>

          {/* Parallax Layer 3 - Front (Main Featured Card) */}
          <motion.div 
            style={mounted ? { y: y3 } : {}}
            className="absolute inset-0 flex items-center justify-center"
          >
            <TiltCard className="cursor-pointer">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                className="bg-card border-2 border-foreground shadow-brutal-lg w-96"
              >
                <div className="relative">
                  <div className="absolute top-2 left-4 bg-secondary text-secondary-foreground px-3 py-1 border-2 border-foreground text-xs font-bold z-10">
                    FEATURED
                  </div>
                  <div className="h-72 bg-muted border-b-2 border-foreground flex items-center justify-center">
                    <div className="w-4/5 h-56 bg-card border-2 border-foreground shadow-brutal-sm relative overflow-hidden">
                      <div className="absolute top-2 left-2 flex gap-1 z-10">
                        <div className="w-2 h-2 rounded-full bg-destructive" />
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
                      </div>
                      <div className="h-full flex items-center justify-center">
                        <img src="/avatar.png" alt="Featured Project" className="w-3/4 h-auto pt-9 object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">               
                  <h3 className="text-2xl font-black">Maximiliano Costilla</h3>
                  <p className="text-xs text-muted-foreground font-bold tracking-wider mb-1">Software Developer</p>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>

          {/* Floating badges */}
          <FloatingElement delay={1.2} duration={3} className="absolute bottom-8 left-1/4 z-20">
            <div className="bg-primary text-primary-foreground px-4 py-2 border-2 border-foreground shadow-brutal text-xs font-bold rotate-3">
             UX/UI
            </div>
          </FloatingElement>
          <FloatingElement delay={1.4} duration={3.5} className="absolute top-1/4 right-1/4 z-20">
            <div className="bg-[#A855F7] text-white px-4 py-2 border-2 border-foreground shadow-brutal text-xs font-bold -rotate-6">
              FULLSTACK
            </div>
          </FloatingElement>
        </div>
      </div>

      {/* Mobile: Featured Project Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        className="bg-card border-2 border-foreground shadow-brutal-lg hover-brutal lg:hidden"
      >
        <div className="relative">
          <div className="absolute top-2 left-4 bg-secondary text-secondary-foreground px-3 py-1 border-2 border-foreground text-xs font-bold z-10">
            FEATURED
          </div>
          <div className="h-72 bg-muted border-b-2 border-foreground flex items-center justify-center">
            <div className="w-4/5 h-56 bg-card border-2 border-foreground shadow-brutal-sm relative overflow-hidden">
              <div className="absolute top-2 left-2 flex gap-1 z-10">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
              </div>
              <div className="h-full flex items-center justify-center">
                <img src="/avatar.png" alt="Featured Project" className="w-3/4 h-auto pt-9 object-contain" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-black">Maximiliano Costilla</h3>
          <p className="text-xs text-muted-foreground font-bold tracking-wider mb-1">Software Developer</p>
        </div>
      </motion.div>

      {/* Floating Work Button - Mobile only */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-24 right-4 w-16 h-16 bg-accent text-accent-foreground rounded-full border-2 border-foreground shadow-brutal flex flex-col items-center justify-center animate-bounce-subtle z-40 lg:hidden"
      >
        <Briefcase className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-0.5">WORK</span>
      </motion.button>
    </section>
  );
}
