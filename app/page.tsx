'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { fadeIn, staggerContainer, scaleIn, springTransition } from '@/helpers/animations'
import { FloatingElementProps, MousePosition, WindowDimensions } from '@/helpers/types'
import { debounce } from '@/helpers/utils'

// Parallax elements
const FloatingElement = ({ children, speed = 1, delay = 0 }: FloatingElementProps) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 100 * speed])
  const x = useTransform(scrollY, [0, 1000], [0, 50 * speed])
  const rotate = useTransform(scrollY, [0, 1000], [0, 360 * speed])

  return (
    <motion.div
      style={{ y, x, rotate }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="absolute pointer-events-none"
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({ width: 0, height: 0 })
  const smoothScrollY = useSpring(scrollY, springTransition)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Initialize window dimensions
    handleResize()

    // Use debounced resize handler for better performance
    const debouncedResize = debounce(handleResize, 250)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  // Existing parallax values
  const heroY = useTransform(scrollY, [0, 1000], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const statsY = useTransform(scrollY, [0, 1000], [0, -100])
  const skillsY = useTransform(scrollY, [0, 1000], [0, 100])
  const projectsY = useTransform(scrollY, [0, 1000], [0, -150])
  const testimonialsY = useTransform(scrollY, [0, 1000], [0, 100])

  // New parallax values
  const backgroundY = useTransform(smoothScrollY, [0, 2000], [0, 400])
  const backgroundOpacity = useTransform(smoothScrollY, [0, 1000], [0.1, 0.3])
  const floatingElementsY = useTransform(smoothScrollY, [0, 2000], [0, -200])
  const cardRotateX = useTransform(smoothScrollY, [0, 1000], [0, 10])
  const cardRotateY = useTransform(smoothScrollY, [0, 1000], [0, -10])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Parallax Elements */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_50%)]"></div>
        <FloatingElement speed={0.5} delay={0.2}>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </FloatingElement>
        <FloatingElement speed={-0.3} delay={0.4}>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </FloatingElement>
        <FloatingElement speed={0.7} delay={0.6}>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        </FloatingElement>
      </motion.div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 transform -skew-y-6"
          style={{ y: heroY, opacity: heroOpacity }}
        ></motion.div>
        
        {/* Floating decorative elements */}
        <FloatingElement speed={0.8} delay={0.1}>
          <div className="absolute top-20 left-10 text-4xl opacity-20">⚡</div>
        </FloatingElement>
        <FloatingElement speed={-0.6} delay={0.3}>
          <div className="absolute top-40 right-20 text-4xl opacity-20">💻</div>
        </FloatingElement>
        <FloatingElement speed={0.4} delay={0.5}>
          <div className="absolute bottom-20 left-1/4 text-4xl opacity-20">🎨</div>
        </FloatingElement>

        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <motion.h1 
                variants={fadeIn}
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
              >
                Hi, I'm Septian
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-6 text-gray-300"
              >
                Full Stack Developer & UI/UX Designer
              </motion.p>
              <motion.p 
                variants={fadeIn}
                className="text-lg mb-8 text-gray-400"
              >
                Passionate about creating beautiful and functional web experiences. 
                Specializing in modern web technologies and user-centered design.
              </motion.p>
              <motion.div 
                variants={fadeIn}
                className="flex space-x-4"
              >
                <Link 
                  href="#contact" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition duration-300"
                >
                  Contact Me
                </Link>
                <Link 
                  href="#projects" 
                  className="border-2 border-purple-500 text-purple-400 px-8 py-3 rounded-full font-semibold hover:bg-purple-500/10 transition duration-300"
                >
                  View Projects
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2"
              style={{
                x: useTransform(() => (mousePosition.x - windowDimensions.width / 2) * 0.05),
                y: useTransform(() => (mousePosition.y - windowDimensions.height / 2) * 0.05)
              }}
            >
              <div className="relative h-64 md:h-96 w-full">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl"
                ></motion.div>
                <Image
                  src="/profile.png"
                  alt="Profile illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-gray-800/50">
        <motion.div 
          style={{ y: statsY }}
          className="container mx-auto px-6"
        >
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY
                }}
                className="text-center bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 transform-gpu transition-transform duration-300"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20 bg-gray-900/50">
        <motion.div 
          style={{ y: skillsY }}
          className="container mx-auto px-6"
        >
          {/* Floating decorative elements */}
          <FloatingElement speed={0.5} delay={0.2}>
            <div className="absolute -left-10 top-1/4 text-6xl opacity-10">⚛️</div>
          </FloatingElement>
          <FloatingElement speed={-0.4} delay={0.4}>
            <div className="absolute -right-10 top-1/2 text-6xl opacity-10">🚀</div>
          </FloatingElement>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            My Skills
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              >
                <motion.div 
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">{skill.title}</h3>
                <p className="text-gray-400">{skill.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm border border-purple-700/50">
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
                  <h3 className="text-xl font-semibold text-gray-200">{exp.title}</h3>
                  <p className="text-purple-400 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-400 mb-4">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm border border-purple-700/50">
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
      <section id="projects" className="relative py-20 bg-gray-900/50">
        <motion.div 
          style={{ y: projectsY }}
          className="container mx-auto px-6"
        >
          {/* Floating decorative elements */}
          <FloatingElement speed={0.6} delay={0.2}>
            <div className="absolute -left-10 top-1/3 text-6xl opacity-10">💡</div>
          </FloatingElement>
          <FloatingElement speed={-0.5} delay={0.4}>
            <div className="absolute -right-10 bottom-1/3 text-6xl opacity-10">🎯</div>
          </FloatingElement>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50"
              >
                <div className="relative h-48 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute inset-0 flex items-center justify-center text-6xl"
                  >
                    {project.icon}
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-200">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm border border-purple-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <Link 
                      href={project.demoLink} 
                      className="text-purple-400 hover:text-purple-300 font-medium"
                      target="_blank"
                    >
                      Live Demo →
                    </Link>
                    <Link 
                      href={project.githubLink} 
                      className="text-purple-400 hover:text-purple-300 font-medium"
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
      <section className="relative py-20 bg-gray-800/50">
        <motion.div 
          style={{ y: testimonialsY }}
          className="container mx-auto px-6"
        >
          {/* Floating decorative elements */}
          <FloatingElement speed={0.4} delay={0.1}>
            <div className="absolute left-1/4 top-1/4 text-5xl opacity-10">✨</div>
          </FloatingElement>
          <FloatingElement speed={-0.3} delay={0.3}>
            <div className="absolute right-1/4 bottom-1/4 text-5xl opacity-10">🌟</div>
          </FloatingElement>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Client Testimonials
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-200">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-gray-900/50">
        <motion.div 
          style={{ y: floatingElementsY }}
          className="absolute inset-0 pointer-events-none"
        >
          <FloatingElement speed={0.5} delay={0.2}>
            <div className="absolute left-1/3 top-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl"></div>
          </FloatingElement>
          <FloatingElement speed={-0.4} delay={0.4}>
            <div className="absolute right-1/3 bottom-1/4 w-56 h-56 bg-pink-500/5 rounded-full blur-2xl"></div>
          </FloatingElement>
        </motion.div>

        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Get In Touch
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-200">Let's Connect</h3>
                <p className="text-gray-400">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="text-2xl">{info.icon}</div>
                      <div>
                        <p className="font-medium text-gray-200">{info.label}</p>
                        <p className="text-gray-400">{info.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 text-gray-200 placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 text-gray-200 placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 text-gray-200 placeholder-gray-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition duration-300"
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-12 border-t border-gray-800">
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 1000], [0, 50]) }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent"></div>
        </motion.div>

        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">About Me</h3>
              <p className="text-gray-400">
                A passionate developer focused on creating beautiful and functional web experiences.
              </p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">Home</Link></li>
                <li><Link href="#projects" className="text-gray-400 hover:text-purple-400 transition duration-300">Projects</Link></li>
                <li><Link href="#contact" className="text-gray-400 hover:text-purple-400 transition duration-300">Contact</Link></li>
              </ul>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: john@example.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Location: San Francisco, CA</li>
              </ul>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Follow Me</h3>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-purple-400 transition duration-300"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-purple-400 transition duration-300"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-purple-400 transition duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          >
            <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "100%", label: "Client Satisfaction" }
]

const skills = [
  {
    icon: "💻",
    title: "Web Development",
    description: "Expert in modern web technologies and frameworks",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"]
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Creating beautiful and intuitive user interfaces",
    technologies: ["Figma", "Adobe XD", "Tailwind CSS", "Material UI"]
  },
  {
    icon: "🚀",
    title: "Performance",
    description: "Optimizing applications for speed and efficiency",
    technologies: ["Webpack", "Vite", "Lighthouse", "Core Web Vitals"]
  },
  {
    icon: "💻",
    title: "Web Development",
    description: "Expert in modern web technologies and frameworks",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"]
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Creating beautiful and intuitive user interfaces",
    technologies: ["Figma", "Adobe XD", "Tailwind CSS", "Material UI"]
  },
  {
    icon: "🚀",
    title: "Performance",
    description: "Optimizing applications for speed and efficiency",
    technologies: ["Webpack", "Vite", "Lighthouse", "Core Web Vitals"]
  }
]

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2021 - Present",
    description: "Leading the development of enterprise-level web applications using React and Node.js. Implementing best practices and mentoring junior developers.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations",
    period: "2019 - 2021",
    description: "Developed and maintained multiple web applications for clients in various industries. Collaborated with design and product teams to deliver high-quality solutions.",
    technologies: ["Vue.js", "Express", "MongoDB", "Redis"]
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Agency",
    period: "2018 - 2019",
    description: "Created responsive and interactive user interfaces for client websites. Worked closely with designers to implement pixel-perfect designs.",
    technologies: ["JavaScript", "HTML5", "CSS3", "jQuery"]
  }
]

const projects = [
  {
    icon: "🌐",
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Stripe integration",
    technologies: ["Next.js", "React", "Stripe", "Tailwind CSS"],
    demoLink: "#",
    githubLink: "#"
  },
  {
    icon: "📱",
    title: "Mobile App Dashboard",
    description: "Analytics dashboard for a mobile application with real-time data",
    technologies: ["React", "TypeScript", "D3.js", "Material UI"],
    demoLink: "#",
    githubLink: "#"
  },
  {
    icon: "🎮",
    title: "Gaming Community Platform",
    description: "Social platform for gamers with real-time chat and tournament management",
    technologies: ["Vue.js", "Node.js", "Socket.io", "MongoDB"],
    demoLink: "#",
    githubLink: "#"
  },
  {
    icon: "📊",
    title: "Financial Analytics Tool",
    description: "Advanced analytics tool for financial data visualization and reporting",
    technologies: ["React", "Python", "D3.js", "PostgreSQL"],
    demoLink: "#",
    githubLink: "#"
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO at TechStart",
    quote: "John's expertise in web development helped us launch our platform ahead of schedule. His attention to detail and problem-solving skills are exceptional."
  },
  {
    name: "Michael Chen",
    position: "Product Manager at InnovateCo",
    quote: "Working with John was a pleasure. He not only delivered high-quality code but also provided valuable insights that improved our product."
  },
  {
    name: "Emily Davis",
    position: "Founder of DesignHub",
    quote: "John's ability to translate complex requirements into elegant solutions is remarkable. He's a true professional and a pleasure to work with."
  }
]

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "john@example.com"
  },
  {
    icon: "📱",
    label: "Phone",
    value: "+1 234 567 890"
  },
  {
    icon: "📍",
    label: "Location",
    value: "San Francisco, CA"
  },
  {
    icon: "⏰",
    label: "Available",
    value: "Mon-Fri, 9AM-6PM PST"
  }
] 