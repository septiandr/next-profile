import { Variants } from 'framer-motion'

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

/**
 * Animation variants for a fade-in effect using Framer Motion.
 *
 * @remarks
 * The `fadeIn` object defines two states:
 * - `hidden`: The element is fully transparent and slightly shifted down.
 * - `visible`: The element transitions to full opacity and its original position.
 *
 * @example
 * ```tsx
 * <motion.div
 *   variants={fadeIn}
 *   initial="hidden"
 *   animate="visible"
 * >
 *   Content
 * </motion.div>
 * ```
 *
 * @see {@link https://www.framer.com/motion/ Framer Motion Documentation}
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1
    }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20
}

export const smoothTransition = {
  duration: 0.5,
  ease: "easeInOut"
} 