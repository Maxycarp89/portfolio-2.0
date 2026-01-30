"use client";

import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { Zap, Search, Menu, Eye, Download, MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { ProjectDetailModal, ProjectDetail } from "./project-detail-modal";

const projects: ProjectDetail[] = [
  {
    id: 1,
    title: "NEON MARKETPLACE",
    shortDescription: "FRONTEND: NEXT.JS 14, TAILWIND, MOTION",
    fullDescription: "Una plataforma de e-commerce moderna construida con las ultimas tecnologias. El proyecto incluye autenticacion de usuarios, carrito de compras persistente, pagos con Stripe, panel de administracion para vendedores, y un sistema de busqueda avanzado con filtros dinamicos. La arquitectura esta optimizada para SEO y rendimiento.",
    role: "Lead Frontend Developer",
    duration: "4 months",
    team: "3 developers + 1 designer",
    tags: ["E-COMMERCE", "FULLSTACK"],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma", "PostgreSQL", "Stripe", "Redis"],
    features: [
      "Autenticacion con OAuth y magic links",
      "Carrito de compras con persistencia",
      "Sistema de pagos con Stripe",
      "Panel de administracion completo",
      "Busqueda con filtros avanzados",
      "Optimizacion SEO y Core Web Vitals"
    ],
    images: [
      "/mockup-bikes.png",
      "/landing-motos.png",
      "/landing-motos2.png"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    terminal: {
      path: "~/auth-service",
      stack: "API: Node/Express + Redis",
      status: "Running on 5000",
    },
    badge: { label: "UI/UX", color: "bg-[#D8B4FE]" },
    logicBadge: undefined
  },
  {
    id: 2,
    title: "DATA VIZ DASHBOARD",
    shortDescription: "FRONTEND: REACT, D3.JS, GSAP",
    fullDescription: "Dashboard interactivo de visualizacion de datos para el sector fintech. Muestra metricas en tiempo real con graficos animados, permite exportar reportes en multiples formatos, y cuenta con un sistema de alertas configurables. El backend procesa millones de transacciones diarias.",
    role: "Fullstack Developer",
    duration: "6 months",
    team: "5 developers + 2 analysts",
    tags: ["FINTECH", "B2B"],
    techStack: ["React", "D3.js", "GSAP", "Python", "FastAPI", "PostgreSQL", "TimescaleDB", "Docker"],
    features: [
      "Graficos interactivos en tiempo real",
      "Procesamiento de big data",
      "Sistema de alertas configurables",
      "Exportacion de reportes PDF/Excel",
      "API REST documentada con OpenAPI",
      "Arquitectura escalable con microservicios"
    ],
    images: [
      "/mockup-terminal.png",
      "/terminal-react.png",
      "/terminal-lab.png",
      "/terminal-lab1.png"
    ],
    liveUrl: "https://example.com",
    terminal: {
      path: "~/analytics-engine",
      stack: "Backend: Python, FastAPI, Postgres",
      command: "$ worker run --queue=high",
    },
    badge: { label: "INTERFACE", color: "bg-secondary" },
    logicBadge: undefined
  },
  {
    id: 3,
    title: "CYBER-TRADE UI",
    shortDescription: "FINTECH DASHBOARD - VUE, GO",
    fullDescription: "Plataforma de trading con interfaz en tiempo real para criptomonedas y activos tradicionales. Incluye graficos de velas avanzados, ordenes limit/market, portafolio tracking, y notificaciones push. El backend en Go maneja conexiones WebSocket de alta frecuencia.",
    role: "Frontend Architect",
    duration: "8 months",
    team: "4 developers",
    tags: ["FINTECH", "TRADING"],
    techStack: ["Vue 3", "Pinia", "Go", "WebSockets", "Redis", "InfluxDB", "Kubernetes"],
    features: [
      "Graficos de trading en tiempo real",
      "Ordenes limit y market",
      "Portfolio tracking automatico",
      "Notificaciones push configurables",
      "Conexiones WebSocket de baja latencia",
      "Escalado horizontal automatico"
    ],
    images: [
      "totem.png",
      "product-detail.png",
      "totem-financials.png"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    terminal: {
      path: "~/trading-engine",
      stack: "Backend: Go, WebSockets, Redis",
      status: "Connected to markets",
    },
    badge: { label: "LOGIC", color: "bg-primary" },
    logicBadge: undefined
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectDetail = (project: ProjectDetail) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectDetail = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <>
      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeProjectDetail} 
      />
      <section id="projects" className="min-h-screen px-4 py-4 pb-24 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary border-2 border-foreground flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black">PROJECTS</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-card border-2 border-foreground shadow-brutal-sm flex items-center justify-center hover-brutal">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-card border-2 border-foreground shadow-brutal-sm flex items-center justify-center hover-brutal">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 bg-foreground mb-6" />

        {/* The Vault Title */}
        <div className="mb-8">
          <div className="inline-block bg-primary text-primary-foreground px-4 py-2 border-2 border-foreground shadow-brutal">
            <span className="font-black italic">THE VAULT</span>
          </div>
        </div>

        {/* Projects Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-card border-2 border-foreground shadow-brutal-lg hover-brutal relative"
            >
              {/* Logic Badge */}
              {project.logicBadge && (
                <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 border-2 border-foreground text-xs font-bold z-10">
                  LOGIC
                </div>
              )}

              {/* Terminal Header */}
              <div className="bg-[#1A1A1A] text-white p-4 border-b-2 border-foreground">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
                  </div>
                </div>
                <div className="font-mono text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-white">{project.terminal.path}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{project.terminal.stack}</p>
                  {project.terminal.status && (
                    <p className="text-xs">
                      Status: <span className="text-[#27CA40]">●</span> {project.terminal.status}
                    </p>
                  )}
                  {project.terminal.command && (
                    <p className="text-gray-300 text-xs">{project.terminal.command}</p>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                {/* UI/UX Badge */}
                <div
                  className={`absolute -bottom-2 right-4 ${project.badge.color} text-foreground px-3 py-1 border-2 border-foreground text-xs font-bold`}
                >
                  {project.badge.label}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <h3 className="text-xl font-black mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground font-bold mb-3">{project.shortDescription}</p>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-card border-2 border-foreground px-3 py-1 text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => openProjectDetail(project)}
                    className="bg-foreground text-card px-4 py-2 border-2 border-foreground shadow-brutal-sm font-bold text-xs flex items-center gap-2 hover-brutal shrink-0"
                  >
                    <Eye className="w-4 h-4" />
                    VER DETALLE
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-24 right-4 flex flex-col gap-3 z-40">
          {/* Download CV Button */}
          <motion.a
            href="/cv.pdf"
            download
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="w-14 h-14 bg-foreground text-card rounded-full border-2 border-foreground shadow-brutal flex items-center justify-center hover-brutal"
            title="Descargar CV"
          >
            <Download className="w-6 h-6" />
          </motion.a>
          
          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/+543816262536"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="w-14 h-14 bg-[#25D366] text-white rounded-full border-2 border-foreground shadow-brutal flex items-center justify-center hover-brutal"
            title="Contactar por WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.a>
        </div>
      </section>
    </>
  );
}
