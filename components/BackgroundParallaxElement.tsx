import React from "react";
import { motion, useTransform } from "framer-motion";
import FloatingElement from "./FloatingComponents";

import type { MotionValue } from "framer-motion";

/**
 * Renders a fixed, animated parallax background element with floating, blurred, colored shapes.
 * 
 * The background's vertical position and opacity are animated based on the provided `smoothScrollY` motion value,
 * creating a parallax effect as the user scrolls. Multiple radial gradients and floating elements are layered to
 * enhance the visual depth and atmosphere.
 * 
 * @param smoothScrollY - A Framer Motion `MotionValue<number>` representing the vertical scroll position, used to animate the background's position and opacity.
 * 
 * @returns A React component rendering the animated parallax background.
 */
function BackgroundParallaxElement({ smoothScrollY }: { smoothScrollY: MotionValue<number> }) {
  const backgroundY = useTransform(smoothScrollY, [0, 2000], [0, 400]);
  const backgroundOpacity = useTransform(smoothScrollY, [0, 1000], [0.1, 0.3]);
  return (
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
  );
}

export default BackgroundParallaxElement;
