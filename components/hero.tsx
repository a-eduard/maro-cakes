'use client'

import { motion } from 'motion/react'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-36 pb-20 md:px-12 md:pt-48 md:pb-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-xs uppercase tracking-[0.35em] text-muted-foreground font-medium"
        >
          Бутик-кондитерская · Батуми
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-sans text-5xl font-medium leading-[1.05] tracking-tight text-[#3F372F] md:text-7xl"
        >
          Авторские торты и десерты в Батуми
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base font-medium leading-relaxed text-muted-foreground md:text-lg"
        >
          Натуральные ингредиенты. Индивидуальный дизайн. Авторские начинки.
        </motion.p>
      </div>
    </section>
  )
}