"use client";

import { motion } from "framer-motion";
import { Gamepad2, Joystick, Trophy, Sparkles, Zap } from "lucide-react";

export function ArcadeSection() {
  const openGame = () => {
    if (typeof window !== "undefined" && (window as unknown as { openArcadeGame?: () => void }).openArcadeGame) {
      (window as unknown as { openArcadeGame: () => void }).openArcadeGame();
    }
  };

  return (
    <section id="arcade" className="px-4 py-12 lg:px-8">
      {/* Section Header - matching other sections */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#A855F7] border-2 border-foreground flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-black">ARCADE</h2>
        </div>
        <div className="flex items-center gap-2 text-secondary">
          <Trophy className="w-4 h-4" />
          <span className="text-xs font-bold hidden sm:inline">HIGH SCORES</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-foreground mb-6" />

      {/* Section Badge */}
      <div className="mb-8">
        <div className="inline-block bg-[#A855F7] text-white px-4 py-2 border-2 border-foreground shadow-brutal">
          <span className="font-black italic">TAKE A BREAK</span>
        </div>
      </div>

      {/* Arcade Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-[#0D0D0D] border-2 border-foreground shadow-brutal-lg overflow-hidden max-w-4xl mx-auto"
      >
        {/* Scanline decoration */}
        <div className="h-1 flex">
          <div className="flex-1 bg-[#FF007A]" />
          <div className="flex-1 bg-[#FFD600]" />
          <div className="flex-1 bg-[#2E5BFF]" />
          <div className="flex-1 bg-[#00FF88]" />
          <div className="flex-1 bg-[#A855F7]" />
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Left side - Game Preview */}
            <div className="flex-shrink-0">
              <div className="w-full lg:w-64 h-48 bg-[#1A1A1A] border-2 border-white/20 relative overflow-hidden">
                {/* Fake game screen */}
                <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-1 opacity-30">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="bg-white/10" />
                  ))}
                </div>
                {/* Snake preview */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-6 h-6 bg-[#00FF88] border border-white/30" 
                  />
                  <div className="w-6 h-6 bg-[#00CC6A] border border-white/30" />
                  <div className="w-6 h-6 bg-[#00CC6A] border border-white/30" />
                  <div className="w-6 h-6 bg-[#00AA55] border border-white/30" />
                </div>
                {/* Food */}
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute top-8 right-8 w-5 h-5 bg-primary border border-white/30" 
                />
                {/* Press Start text */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white/70 text-xs font-mono"
                  >
                    PRESS START
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Right side - Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-secondary text-xs font-bold tracking-wider">CLASSIC GAME</span>
              </div>
              <h3 className="text-white text-3xl lg:text-4xl font-black mb-3">SNAKE.EXE</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-md">
                Un clasico reinventado con estetica neobrutalista. Demuestra tus reflejos y compite por el high score.
              </p>
              
              {/* Controls hint */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-gray-500 text-xs">CONTROLS:</span>
                <div className="flex gap-2">
                  <span className="bg-white/10 text-white px-3 py-1.5 border border-white/20 text-xs font-bold">W</span>
                  <span className="bg-white/10 text-white px-3 py-1.5 border border-white/20 text-xs font-bold">A</span>
                  <span className="bg-white/10 text-white px-3 py-1.5 border border-white/20 text-xs font-bold">S</span>
                  <span className="bg-white/10 text-white px-3 py-1.5 border border-white/20 text-xs font-bold">D</span>
                </div>
                <span className="text-gray-600 text-xs">or Arrow Keys</span>
              </div>

              {/* Play button and status */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  onClick={openGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#A855F7] text-white px-8 py-4 border-2 border-foreground shadow-brutal font-black text-lg flex items-center gap-3 hover-brutal"
                >
                  <Zap className="w-5 h-5" />
                  PLAY NOW
                </motion.button>
                
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
                  <span className="text-[#00FF88] text-xs font-bold">READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="h-1 flex">
          <div className="flex-1 bg-[#A855F7]" />
          <div className="flex-1 bg-[#00FF88]" />
          <div className="flex-1 bg-[#2E5BFF]" />
          <div className="flex-1 bg-[#FFD600]" />
          <div className="flex-1 bg-[#FF007A]" />
        </div>
      </motion.div>
    </section>
  );
}
