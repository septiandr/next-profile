"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  fadeIn,
  staggerContainer,
  scaleIn,
  springTransition,
} from "@/helpers/animations";
import { MousePosition, WindowDimensions } from "@/helpers/types";
import { debounce } from "@/helpers/utils";
import FloatingElement from "@/components/FloatingComponents";
import {
  contactInfo,
  experiences,
  projects,
  skills,
  stats,
  testimonials,
} from "@/constant/constant";
import BackgroundParallaxElement from "@/components/BackgroundParallaxElement";
import HeroLayout from "@/components/layout/HeroLayout";

export default function Home() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });
  const smoothScrollY = useSpring(scrollY, springTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initialize window dimensions
    handleResize();

    // Use debounced resize handler for better performance
    const debouncedResize = debounce(handleResize, 250);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Existing parallax values
  const statsY = useTransform(scrollY, [0, 1000], [0, -100]);
  const skillsY = useTransform(scrollY, [0, 1000], [0, 100]);
  const projectsY = useTransform(scrollY, [0, 1000], [0, -150]);
  const testimonialsY = useTransform(scrollY, [0, 1000], [0, 100]);

  // New parallax values
  const floatingElementsY = useTransform(smoothScrollY, [0, 2000], [0, -200]);
  const cardRotateX = useTransform(smoothScrollY, [0, 1000], [0, 10]);
  const cardRotateY = useTransform(smoothScrollY, [0, 1000], [0, -10]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Parallax Elements */}
      {/* <BackgroundParallaxElement smoothScrollY={smoothScrollY}/> */}
      {/* Hero Section */}
      <HeroLayout
        mousePosition={mousePosition}
        windowDimensions={windowDimensions}
        scrollY={scrollY}
      />

      {/* Stats Section */}
      <section className="relative py-12 sm:py-16 bg-gray-800/50">
        <motion.div style={{ y: statsY }} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                }}
                className="text-center bg-gray-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 transform-gpu transition-transform duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm sm:text-base text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="relative py-16 sm:py-20 bg-gray-900/50">
        <motion.div style={{ y: skillsY }} className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating decorative elements */}
          <FloatingElement speed={0.5} delay={0.2}>
            <div className="absolute -left-10 top-1/4 text-4xl sm:text-6xl opacity-10">
              ⚛️
            </div>
          </FloatingElement>
          <FloatingElement speed={-0.4} delay={0.4}>
            <div className="absolute -right-10 top-1/2 text-4xl sm:text-6xl opacity-10">
              🚀
            </div>
          </FloatingElement>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            My Skills
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl sm:text-4xl mb-4"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">
                  {skill.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs sm:text-sm border border-purple-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="relative py-20 bg-gray-800/50">
        <motion.div
          style={{ y: floatingElementsY }}
          className="absolute inset-0 pointer-events-none"
        >
          <FloatingElement speed={0.3} delay={0.1}>
            <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
          </FloatingElement>
          <FloatingElement speed={-0.2} delay={0.3}>
            <div className="absolute right-1/4 bottom-1/3 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl"></div>
          </FloatingElement>
        </motion.div>

        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Work Experience
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="relative pl-8 pb-8 border-l-2 border-purple-700/50 last:border-l-0 last:pb-0"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-gray-200">
                    {exp.title}
                  </h3>
                  <p className="text-purple-400 font-medium mb-2">
                    {exp.company}
                  </p>
                  <p className="text-gray-400 mb-4">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm border border-purple-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 sm:py-20 bg-gray-900/50">
        <motion.div style={{ y: projectsY }} className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating decorative elements */}
          <FloatingElement speed={0.6} delay={0.2}>
            <div className="absolute -left-10 top-1/3 text-4xl sm:text-6xl opacity-10">
              💡
            </div>
          </FloatingElement>
          <FloatingElement speed={-0.5} delay={0.4}>
            <div className="absolute -right-10 bottom-1/3 text-4xl sm:text-6xl opacity-10">
              🎯
            </div>
          </FloatingElement>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50"
              >
                <div className="relative h-40 sm:h-48 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl"
                  >
                    {project.icon}
                  </motion.div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs sm:text-sm border border-purple-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <Link
                      href={project.demoLink}
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm sm:text-base text-center"
                      target="_blank"
                    >
                      Live Demo →
                    </Link>
                    <Link
                      href={project.githubLink}
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm sm:text-base text-center"
                      target="_blank"
                    >
                      GitHub →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 sm:py-20 bg-gray-800/50">
        <motion.div
          style={{ y: testimonialsY }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Floating decorative elements */}
          <FloatingElement speed={0.4} delay={0.1}>
            <div className="absolute left-1/4 top-1/4 text-3xl sm:text-5xl opacity-10">
              ✨
            </div>
          </FloatingElement>
          <FloatingElement speed={-0.3} delay={0.3}>
            <div className="absolute right-1/4 bottom-1/4 text-3xl sm:text-5xl opacity-10">
              🌟
            </div>
          </FloatingElement>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Client Testimonials
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="font-semibold text-gray-200 text-sm sm:text-base">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 italic text-sm sm:text-base">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-20 bg-gray-900/50">
        <motion.div
          style={{ y: floatingElementsY }}
          className="absolute inset-0 pointer-events-none"
        >
          <FloatingElement speed={0.5} delay={0.2}>
            <div className="absolute left-1/3 top-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-purple-500/5 rounded-full blur-2xl"></div>
          </FloatingElement>
          <FloatingElement speed={-0.4} delay={0.4}>
            <div className="absolute right-1/3 bottom-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-pink-500/5 rounded-full blur-2xl"></div>
          </FloatingElement>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Get In Touch
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-200">
                  Let's Connect
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your visions.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="text-xl sm:text-2xl">{info.icon}</div>
                      <div>
                        <p className="font-medium text-gray-200 text-sm sm:text-base">
                          {info.label}
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm">{info.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              >
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 text-sm sm:text-base"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-8 sm:py-12 border-t border-gray-800">
        <motion.div
          style={{ y: useTransform(scrollY, [0, 1000], [0, 50]) }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent"></div>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            <motion.div variants={fadeIn}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-200">
                About Me
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                A passionate developer focused on creating beautiful and
                functional web experiences.
              </p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-200">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition duration-300"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-200">
                Contact Info
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>Email: john@example.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Location: San Francisco, CA</li>
              </ul>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-200">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition duration-300 text-xl sm:text-2xl"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition duration-300 text-xl sm:text-2xl"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition duration-300 text-xl sm:text-2xl"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm sm:text-base text-gray-400">
            <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
