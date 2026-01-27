"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Box, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

const tools = [
  { 
    name: "Git", 
    abbr: "GIT", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Version Control System"
  },
  { 
    name: "Figma", 
    abbr: "FIG", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    description: "UI/UX Design Tool"
  },
  { 
    name: "AWS", 
    abbr: "AWS", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    description: "Cloud Infrastructure"
  },
  { 
    name: "Docker", 
    abbr: "DOCK", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    description: "Containerization Platform"
  },
];


const skillsJson = `{
  "name": "Maximiliano Costilla",
  "stack": {
    "frontend": [
      "Javascript", "React", "Next.js", "zustand", "TailwindCSS"
    ],
    "backend": [
      "Node.js", "Express", "SAP", "MySQL", "MongoDB", "AWS"
    ]
  },
  "exp": "Semi-senior"
}`;

function TypingAnimation({ text, isInView }: { text: string; isInView: boolean }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return <span>{displayedText}</span>;
}

export function SkillsSection() {
  const terminalRef = useRef(null);
  const isInView = useInView(terminalRef, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <section id="skills" className="min-h-screen px-4 py-4 pb-24 lg:px-8 xl:px-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl lg:text-4xl font-black italic tracking-tight">SKILLS.DEV</h2>
          <div className="inline-block bg-card border-2 border-foreground px-3 py-1 mt-2">
            <span className="text-xs font-bold">SSR FULLSTACK</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-[#A855F7] rounded-full border-2 border-foreground flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Desktop: Two column layout, Mobile: Single column */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 space-y-4 lg:space-y-0"
      >
        {/* Left Column */}
        <div className="space-y-4">
          {/* Top Row - React + TS/Tailwind */}
          <div className="grid grid-cols-2 gap-4">
            {/* React Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#FF9500] border-2 border-foreground shadow-brutal p-4 relative hover-brutal"
            >
              <div className="absolute top-2 right-2 bg-card text-foreground px-2 py-0.5 border-2 border-foreground text-[10px] font-bold">
                FRONTEND
              </div>
              <Box className="w-10 h-10 mb-4" strokeWidth={1.5} />
              <h3 className="text-3xl font-black italic">REACT</h3>
              <p className="text-xs font-bold mt-1 opacity-80">HOOKS &amp; PERFORMANCE</p>
            </motion.div>

            {/* TS/JS & Tailwind Stack */}
            <div className="flex flex-col gap-4">
              <motion.div
                variants={itemVariants}
                className="bg-[#D8B4FE] border-2 border-foreground shadow-brutal p-3 flex items-center gap-2 hover-brutal flex-1"
              >
                <div className="bg-foreground text-card px-2 py-1 text-xs font-bold">JS</div>
                <span className="font-black italic">TS / JS</span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-[#F5F5F5] border-2 border-foreground shadow-brutal p-3 flex items-center gap-2 hover-brutal flex-1"
              >
                <div className="bg-foreground text-card px-2 py-1 text-xs font-bold">CSS</div>
                <span className="font-black italic">TAILWIND</span>
              </motion.div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              variants={itemVariants}
              className="bg-card border-2 border-foreground shadow-brutal p-3 hover-brutal"
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-secondary">▲</span>
                <span className="font-black italic text-sm">NODE.JS</span>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground leading-tight">
                FULLSTACK POWERHOUSE
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-[#D8B4FE] border-2 border-foreground shadow-brutal p-3 text-center hover-brutal"
            >
              <span className="text-2xl font-black">4+</span>
              <p className="text-[10px] font-bold">
                YEARS
                <br />
                XP
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-secondary border-2 border-foreground shadow-brutal p-3 text-center hover-brutal"
            >
              <span className="text-2xl font-black">20+</span>
              <p className="text-[10px] font-bold">
                LIVE
                <br />
                APPS
              </p>
            </motion.div>
          </div>

          {/* Tools Section */}
         <TooltipProvider delayDuration={100}>
            <motion.div
              variants={itemVariants}
              className="bg-linear-to-r from-[#C084FC] to-[#FB923C] border-2 border-foreground shadow-brutal p-4 flex items-center justify-between"
            >
              <span className="font-black italic text-lg">TOOLS:</span>
              <div className="flex gap-3">
                {tools.map((tool) => (
                  <Tooltip key={tool.name}>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-11 h-11 bg-card border-2 border-foreground rounded-full flex items-center justify-center cursor-pointer shadow-brutal-sm hover:shadow-brutal transition-shadow overflow-hidden p-2"
                      >
                        <Image
                          src={tool.image || "/placeholder.svg"}
                          alt={tool.name}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-foreground text-card border-2 border-foreground px-3 py-2"
                    >
                      <p className="font-bold">{tool.name}</p>
                      <p className="text-xs text-gray-400">{tool.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          </TooltipProvider>

          {/* Current Projects */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-foreground" />
              <h3 className="font-black italic text-lg">CURRENT PROJECTS</h3>
            </div>
            <motion.div
              variants={itemVariants}
              className="bg-card border-2 border-foreground shadow-brutal p-4 flex items-center gap-4 hover-brutal"
            >
              <div className="w-14 h-14 bg-linear-to-br from-[#C084FC] via-[#38BDF8] to-[#FB923C] rounded-lg shrink-0" />
              <div>
                <h4 className="font-black italic">CYBER-TRADE UI</h4>
                <p className="text-xs text-muted-foreground">FINTECH DASHBOARD</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-[#42B883] text-white px-2 py-0.5 text-[10px] font-bold border border-foreground">
                    VUE
                  </span>
                  <span className="bg-[#00ADD8] text-white px-2 py-0.5 text-[10px] font-bold border border-foreground">
                    GO
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Terminal */}
        <motion.div
          ref={terminalRef}
          variants={itemVariants}
          className="bg-[#0D0D0D] border-2 border-foreground shadow-brutal-lg overflow-hidden lg:h-fit"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
            </div>
            <span className="text-gray-400 text-xs font-mono ml-2">SKILLS.JSON — 80x24</span>
          </div>
          {/* Terminal Content */}
          <div className="p-4 lg:p-6 font-mono text-sm lg:text-base">
            <pre className="text-[#00FF88]">
              <TypingAnimation text={skillsJson} isInView={isInView} />
              <span className="animate-pulse">█</span>
            </pre>
            <div className="mt-4 text-gray-400">
              <span className="text-white font-bold">MAXYCARP89</span> %{" "}
              <span className="animate-pulse">█</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
