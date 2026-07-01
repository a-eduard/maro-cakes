'use client'

import { motion } from 'motion/react'

/**
 * Delicate intersecting "ribbon" curves — a nod to MarO's pastry-box
 * line pattern. Kept extremely faint so it never competes with the
 * cake photography; it only provides a quiet background rhythm.
 */
const paths = [
  'M-100 240 C 300 60, 620 60, 900 260 S 1500 520, 2100 300',
  'M-100 420 C 360 220, 760 300, 1080 460 S 1620 720, 2100 500',
  'M-100 40 C 420 -60, 820 120, 1180 40 S 1700 -40, 2100 120',
  'M-100 640 C 300 460, 700 560, 1040 660 S 1640 900, 2100 700',
]

export function BoxLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 2000 760"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--line)"
          strokeWidth={i % 2 === 0 ? 1.1 : 0.7}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 3,
            delay: i * 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </svg>
  )
}
