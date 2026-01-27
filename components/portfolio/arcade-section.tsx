"use client";

import { motion } from "framer-motion";
import { Gamepad2, Trophy, Sparkles, Zap } from "lucide-react";

export function ArcadeSection() {
  const openGame = () => {
    if (typeof window !== "undefined" && (window as unknown as { openArcadeGame?: () => void }).openArcadeGame) {
      (window as unknown as { openArcadeGame: () => void }).openArcadeGame();
    }
  };

  return (
    <section id="arcade" className="px-4 py-4 lg:px-8 xl:px-16">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#A855F7] border-2 border-foreground flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl lg:text-2xl font-black">ARCADE</h2>
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

        {/* Desktop: Side by side layout */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {/* Game Preview Card - Takes 2/3 width on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="lg:col-span-2 bg-[#0D0D0D] border-2 border-foreground shadow-brutal-lg overflow-hidden"
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
              <div className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-8">
                {/* Game Preview */}
                <div className="shrink-0">
                  <div className="w-full md:w-56 lg:w-64 h-40 lg:h-48 bg-[#1A1A1A] border-2 border-white/20 relative overflow-hidden">
                    {/* Grid background */}
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
                        className="w-5 h-5 lg:w-6 lg:h-6 bg-[#00FF88] border border-white/30" 
                      />
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-[#00CC6A] border border-white/30" />
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-[#00CC6A] border border-white/30" />
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-[#00AA55] border border-white/30" />
                    </div>
                    {/* Food */}
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute top-6 right-6 w-4 h-4 lg:w-5 lg:h-5 bg-primary border border-white/30" 
                    />
                    {/* Press Start */}
                    <div className="absolute bottom-3 left-0 right-0 text-center">
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

                {/* Game Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="text-secondary text-xs font-bold tracking-wider">CLASSIC GAME</span>
                  </div>
                  <h3 className="text-white text-2xl lg:text-3xl font-black mb-2">SNAKE.EXE</h3>
                  <p className="text-gray-400 text-sm mb-4 max-w-sm">
                    Un clasico reinventado con estetica neobrutalista. Demuestra tus reflejos.
                  </p>
                  
                  {/* Play Button */}
                  <motion.button
                    onClick={openGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#A855F7] text-white px-6 py-3 lg:px-8 lg:py-4 border-2 border-foreground shadow-brutal font-black text-base lg:text-lg flex items-center gap-3 hover-brutal"
                  >
                    <Zap className="w-5 h-5" />
                    PLAY NOW
                  </motion.button>
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

          {/* Right Column - Stats/Info (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            className="hidden lg:flex lg:flex-col gap-4"
          >
            {/* Controls Card */}
            <div className="bg-card border-2 border-foreground shadow-brutal p-5 flex-1">
              <h4 className="font-black text-sm mb-4">CONTROLS</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="bg-foreground text-card w-8 h-8 flex items-center m justify-center text-xs font-bold">W</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Move Up</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="bg-foreground text-card w-8 h-8 flex items-center justify-center text-xs font-bold">A</span>
                    <span className="bg-foreground text-card w-8 h-8 flex items-center justify-center text-xs font-bold">S</span>
                    <span className="bg-foreground text-card w-8 h-8 flex items-center justify-center text-xs font-bold">D</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Move</span>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                  Or use Arrow Keys / Touch Controls
                </p>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-[#00FF88] border-2 border-foreground shadow-brutal p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                <span className="text-xs font-bold">SYSTEM STATUS</span>
              </div>
              <p className="font-black text-lg">READY TO PLAY</p>
              <p className="text-xs mt-1">No installation required</p>
            </div>

            {/* Fun Fact Card */}
            <div className="bg-secondary border-2 border-foreground shadow-brutal p-5">
              <span className="text-xs font-bold">FUN FACT</span>
              <p className="font-black text-sm mt-2">Built with React + Canvas API</p>
              <p className="text-xs mt-1 text-secondary-foreground/80">
                60 FPS smooth gameplay
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
