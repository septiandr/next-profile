/**
 * FloatingComponents.tsx
 * 
 * This file provides a component for creating elements that float and animate based on scroll position.
 * It uses framer-motion to create smooth, scroll-based animations for decorative elements.
 */

import { FloatingElementProps } from "@/helpers/types"
import { useScroll, useTransform, motion } from "framer-motion"

/**
 * FloatingElement
 * 
 * A component that creates floating, animated elements that respond to page scrolling.
 * 
 * @component
 * @param {Object} props
 * @param {ReactNode} props.children - The content to be displayed within the floating element
 * @param {number} [props.speed=1] - Controls the animation speed/intensity of the floating effect
 * @param {number} [props.delay=0] - Delay in seconds before the animation starts
 * 
 * @example
 * // Basic usage
 * <FloatingElement>
 *   <div className="w-12 h-12 bg-blue-500 rounded-full" />
 * </FloatingElement>
 * 
 * @example
 * // With custom speed and delay
 * <FloatingElement speed={1.5} delay={0.3}>
 *   <Image src="/icon.svg" width={40} height={40} alt="Floating icon" />
 * </FloatingElement>
 * 
 * @returns {JSX.Element} A motion div that animates based on scroll position
 */
const FloatingElement = ({ children, speed = 1, delay = 0 }: FloatingElementProps) => {
const { scrollY } = useScroll() 
// Ambil nilai scroll vertikal dari hook useScroll (berupa MotionValue)

const y = useTransform(scrollY, [0, 1000], [0, 100 * speed]) 
// Saat scrollY dari 0 ke 1000, nilai y berubah dari 0 ke 100 * speed (untuk gerak vertikal)

const x = useTransform(scrollY, [0, 1000], [0, 50 * speed]) 
// Saat scrollY dari 0 ke 1000, nilai x berubah dari 0 ke 50 * speed (untuk gerak horizontal)

const rotate = useTransform(scrollY, [0, 1000], [0, 360 * speed]) 
// Saat scrollY dari 0 ke 1000, nilai rotate berubah dari 0 ke 360 * speed (untuk rotasi)


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

export default FloatingElement