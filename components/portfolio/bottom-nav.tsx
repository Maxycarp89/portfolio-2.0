"use client";

import { motion } from "framer-motion";
import { Home, Grid3X3, Settings, Mail, Code2 } from "lucide-react";

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "home", label: "HOME", icon: Home },
  { id: "skills", label: "SKILLS", icon: Settings },
  { id: "projects", label: "PROJECTS", icon: Grid3X3 },
  { id: "contact", label: "CONTACT", icon: Mail },
];

export function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-foreground shadow-[0_-4px_0_0_#000000] z-50"
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                isActive
                  ? "bg-secondary border-2 border-foreground shadow-brutal-sm"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-foreground" : "text-muted-foreground"}`} />
              <span
                className={`text-[10px] font-bold ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

// Alternative nav for projects page style
export function BottomNavAlt({ activeSection, onNavigate }: BottomNavProps) {
  const altNavItems = [
    { id: "home", icon: Home, filled: true },
    { id: "work", icon: Grid3X3, filled: false },
    { id: "code", icon: Code2, filled: false },
    { id: "contact", icon: Mail, filled: false },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="fixed bottom-4 left-4 right-4 bg-card border-2 border-foreground shadow-brutal rounded-full z-50"
    >
      <div className="flex items-center justify-around py-3 px-6">
        {altNavItems.map((item, index) => {
          const Icon = item.icon;
          const isFirst = index === 0;
          const isLast = index === altNavItems.length - 1;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isFirst
                  ? "bg-secondary border-2 border-foreground"
                  : isLast
                  ? "bg-[#A855F7] border-2 border-foreground text-white"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
