import { FloatingElementProps } from "@/helpers/types"
import { useScroll, useTransform,motion } from "framer-motion"

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

export default FloatingElement