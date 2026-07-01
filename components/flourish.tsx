'use client'

import { motion } from 'motion/react'

/**
 * Subtle abstract flowing line — evokes a ribbon of frosting.
 * Used only as a faint background accent / section divider.
 */
export function Flourish({
  className,
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      viewBox="0 0 1200 200"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <motion.path
        d="M-20 120 C 200 40, 360 40, 560 110 S 940 190, 1220 90"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M-20 150 C 240 90, 420 90, 620 140 S 960 200, 1220 130"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, delay: 0.2, ease: 'easeInOut' }}
      />
    </svg>
  )
}
