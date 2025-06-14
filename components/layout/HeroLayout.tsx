import React from "react";
import { motion, useTransform } from "framer-motion";
import FloatingElement from "../FloatingComponents";
import { fadeIn, staggerContainer } from "@/helpers/animations";
import Link from "next/link";
import Image from "next/image";

type HeroLayoutProps = {
  mousePosition: { x: number; y: number };
  windowDimensions: { width: number; height: number };
  scrollY: any;
};

function HeroLayout({
  mousePosition,
  windowDimensions,
  scrollY,
}: HeroLayoutProps) {
  const heroY = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  return (
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
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20">
          🎨
        </div>
      </FloatingElement>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
            >
              Hi, I'm Septian
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg sm:text-xl mb-4 md:mb-6 text-gray-300">
              Full Stack Developer & UI/UX Designer
            </motion.p>
            <motion.p variants={fadeIn} className="text-base sm:text-lg mb-6 md:mb-8 text-gray-400">
              Passionate about creating beautiful and functional web
              experiences. Specializing in modern web technologies and
              user-centered design.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="#contact"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 text-center"
              >
                Contact Me
              </Link>
              <Link
                href="#projects"
                className="border-2 border-purple-500 text-purple-400 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-purple-500/10 transition duration-300 text-center"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2 relative"
            style={{
              x: useTransform(
                () => (mousePosition.x - windowDimensions.width / 2) * 0.05
              ),
              y: useTransform(
                () => (mousePosition.y - windowDimensions.height / 2) * 0.05
              ),
            }}
          >
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full">
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
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl"
              ></motion.div>
              <Image
                src="/profile.png"
                alt="Profile illustration"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroLayout;
