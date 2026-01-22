"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, ArrowUpRight } from "lucide-react";

export function ContactSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ];

  return (
    <section id="contact" className="min-h-screen px-4 py-12 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-foreground" />
          <span className="text-xs font-bold text-muted-foreground tracking-wider">GET IN TOUCH</span>
        </div>
        <h2 className="text-4xl font-black">
          LET&apos;S <span className="underline-accent">CONNECT</span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-6"
      >
        {/* Main CTA Card */}
        <motion.div
          variants={itemVariants}
          className="bg-foreground text-card p-6 border-2 border-foreground shadow-brutal-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <Mail className="w-10 h-10" />
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black mb-2">SAY HELLO</h3>
          <p className="text-sm opacity-80 mb-4">
            Got a project in mind? Let&apos;s create something amazing together.
          </p>
          <a
            href="mailto:maxicostilla21@gmail.com"
            className="inline-block bg-secondary text-secondary-foreground px-4 py-2 border-2 border-card font-bold text-sm hover:translate-x-1 transition-transform"
          >
            maxicostilla21@gmail.com
          </a>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card border-2 border-foreground shadow-brutal p-6"
        >
          <h3 className="font-black text-lg mb-4">QUICK MESSAGE</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="text-xs font-bold block mb-1">NAME</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="w-full bg-muted border-2 border-foreground px-4 py-3 font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-bold block mb-1">EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                className="w-full bg-muted border-2 border-foreground px-4 py-3 font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs font-bold block mb-1">MESSAGE</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full bg-muted border-2 border-foreground px-4 py-3 font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground border-2 border-foreground shadow-brutal px-6 py-3 font-bold flex items-center justify-center gap-2 hover-brutal"
            >
              <Send className="w-4 h-4" />
              SEND MESSAGE
            </button>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className="bg-card border-2 border-foreground shadow-brutal p-4 flex flex-col items-center gap-2 hover-brutal"
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-bold">{social.label.toUpperCase()}</span>
              </a>
            );
          })}
        </motion.div>

        {/* Availability Badge */}
        <motion.div
          variants={itemVariants}
          className="bg-[#00FF88] border-2 border-foreground shadow-brutal p-4 flex items-center gap-3"
        >
          <div className="w-3 h-3 rounded-full bg-foreground animate-pulse" />
          <div>
            <p className="font-black text-sm">AVAILABLE FOR WORK</p>
            <p className="text-xs">Currently taking on new projects</p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-xs text-muted-foreground font-bold">
            DESIGNED &amp; DEVELOPED BY WAW STUDIO
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2026 Maximiliano Costilla
          </p>
        </div>
      </motion.div>
    </section>
  );
}
