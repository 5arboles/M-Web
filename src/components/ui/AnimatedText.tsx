import React from 'react'
import { motion } from 'framer-motion'

interface WordRevealTitleProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'div'
  className?: string
  wordClassName?: string
  baseDelay?: number
  stagger?: number
}

/**
 * Animación de aparición de abajo hacia arriba PALABRA POR PALABRA en loop cada 3 segundos.
 */
export const WordRevealTitle: React.FC<WordRevealTitleProps> = ({
  text,
  as: Tag = 'h2',
  className = '',
  wordClassName = '',
  baseDelay = 0,
  stagger = 0.08,
}) => {
  const words = text.trim().split(/\s+/)

  return (
    <Tag className={className}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-bottom mr-[0.24em] last:mr-0 py-[0.04em]"
        >
          <motion.span
            animate={{ y: ['110%', '0%'] }}
            transition={{
              duration: 0.75,
              delay: baseDelay + idx * stagger,
              ease: [0.16, 1, 0.3, 1],
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className={`inline-block will-change-transform ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

interface RollingTextProps {
  text: string
  className?: string
}

/**
 * Efecto Rolling Text Button (estilo Cuberto / Streetwear):
 * Al hacer hover en el botón/enlace padre (clase `group`), cada letra rueda de abajo hacia arriba con stagger.
 */
export const RollingText: React.FC<RollingTextProps> = ({ text, className = '' }) => {
  const chars = Array.from(text)

  return (
    <span
      className={`relative inline-flex overflow-hidden leading-[1.15] select-none ${className}`}
      aria-label={text}
    >
      {/* Capa original que sube al hacer hover */}
      <span className="inline-flex">
        {chars.map((char, i) => (
          <span
            key={`top-${i}`}
            style={{ transitionDelay: `${i * 16}ms` }}
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* Capa clonada inferior que entra desde abajo al hacer hover */}
      <span className="absolute inset-0 inline-flex" aria-hidden="true">
        {chars.map((char, i) => (
          <span
            key={`bottom-${i}`}
            style={{ transitionDelay: `${i * 16}ms` }}
            className="inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  )
}
