import { ReactNode } from 'react'

export interface FloatingElementProps {
  children: ReactNode
  speed?: number
  delay?: number
}

export interface Stat {
  value: string
  label: string
}

export interface Skill {
  title: string
  description: string
  icon: string
  technologies: string[]
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
  github?: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  image: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface WindowDimensions {
  width: number
  height: number
}

export interface MousePosition {
  x: number
  y: number
} 