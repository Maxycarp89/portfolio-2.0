"use client";

import React from "react"

import { useState, useRef, useEffect } from "react";
import { HeroSection } from "@/components/portfolio/hero-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { BottomNav } from "@/components/portfolio/bottom-nav";
import { ContactSection } from "@/components/portfolio/contact-section";
import { CursorTrail } from "@/components/portfolio/cursor-trail";
import { TouchEffects } from "@/components/portfolio/touch-effects";
import { ArcadeGame } from "@/components/portfolio/arcade-game";
import { ArcadeSection } from "@/components/portfolio/arcade-section";

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  
  const homeRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
      home: homeRef,
      skills: skillsRef,
      projects: projectsRef,
      contact: contactRef,
    };
    
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: homeRef },
        { id: "skills", ref: skillsRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background grid-pattern">
      {/* Interactive cursor trail (desktop only) */}
      <CursorTrail />
      
      {/* Touch effects for mobile */}
      <TouchEffects />
      
      {/* Arcade game modal */}
      <ArcadeGame />
      
      <div ref={homeRef}>
        <HeroSection />
      </div>
      
      <div ref={skillsRef}>
        <SkillsSection />
      </div>
      
      <div ref={projectsRef}>
        <ProjectsSection />
      </div>

      {/* Arcade Section - visible game access */}
      <ArcadeSection />
      
      <div ref={contactRef}>
        <ContactSection />
      </div>
      
      <BottomNav activeSection={activeSection} onNavigate={handleNavigate} />
    </main>
  );
}
