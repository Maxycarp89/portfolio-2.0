"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Calendar, Users, Layers } from "lucide-react";
import { useState } from "react";

export interface ProjectDetail {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  duration: string;
  team: string;
  tags: string[];
  techStack: string[];
  features: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  terminal: {
    path: string;
    stack: string;
    status?: string;
    command?: string;
  };
  badge: { label: string; color: string };
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-start justify-center bg-black/80 p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-card border-4 border-foreground shadow-brutal-lg w-full max-w-4xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-foreground text-card p-4 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className={`${project.badge.color} text-foreground px-3 py-1 border-2 border-card text-xs font-bold`}>
                  {project.badge.label}
                </div>
                <span className="font-bold tracking-wider text-lg">{project.title}</span>
              </div>
              <button 
                onClick={onClose}
                className="hover:bg-card/20 p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Gallery */}
            <div className="relative bg-muted border-b-2 border-foreground">
              <div className="aspect-video relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </AnimatePresence>
                
                {/* Navigation arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card border-2 border-foreground shadow-brutal flex items-center justify-center hover-brutal"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card border-2 border-foreground shadow-brutal flex items-center justify-center hover-brutal"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-card px-3 py-1 text-xs font-bold">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              {project.images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-card border-t-2 border-foreground">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-16 h-12 shrink-0 border-2 overflow-hidden transition-all ${
                        idx === currentImageIndex 
                          ? "border-primary shadow-brutal-sm" 
                          : "border-foreground opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img 
                        src={img || "/placeholder.svg"} 
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
              {/* Quick info cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                <div className="bg-muted p-3 border-2 border-foreground">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-bold">ROLE</span>
                  </div>
                  <p className="font-bold text-sm">{project.role}</p>
                </div>
                <div className="bg-muted p-3 border-2 border-foreground">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-bold">DURATION</span>
                  </div>
                  <p className="font-bold text-sm">{project.duration}</p>
                </div>
                <div className="bg-muted p-3 border-2 border-foreground col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-bold">TEAM</span>
                  </div>
                  <p className="font-bold text-sm">{project.team}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-black text-lg mb-3">ABOUT THE PROJECT</h4>
                <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-black text-lg mb-3">KEY FEATURES</h4>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="font-black text-lg mb-3">TECH STACK</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-foreground text-card px-3 py-1 text-xs font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Terminal Info */}
              <div className="bg-[#1A1A1A] text-white p-4 border-2 border-foreground mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
                  </div>
                </div>
                <div className="font-mono text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <span className="text-white">{project.terminal.path}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{project.terminal.stack}</p>
                  {project.terminal.status && (
                    <p className="text-xs">
                      Status: <span className="text-[#27CA40]">●</span> {project.terminal.status}
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-6 py-3 border-2 border-foreground shadow-brutal font-bold flex items-center gap-2 hover-brutal"
                  >
                    <ExternalLink className="w-4 h-4" />
                    VIEW LIVE
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card text-foreground px-6 py-3 border-2 border-foreground shadow-brutal font-bold flex items-center gap-2 hover-brutal"
                  >
                    <Github className="w-4 h-4" />
                    SOURCE CODE
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
