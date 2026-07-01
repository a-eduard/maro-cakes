'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'

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
          className="mb-8 text-xs uppercase tracking-[0.35em] text-muted-foreground"
        >
          Бутик-кондитерская · Батуми
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-serif text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-7xl"
        >
          Авторские торты и десерты в Батуми
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Натуральные ингредиенты. Индивидуальный дизайн. Авторские начинки.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contacts"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-9 text-sm tracking-wide text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30"
          >
            Заказать торт
          </a>
          <a
            href="#contacts"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/20 px-8 text-sm tracking-wide text-foreground transition-colors hover:border-foreground"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Написать в WhatsApp
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-16 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] sm:aspect-[16/12] sm:max-w-3xl"
      >
        <Image
          src="/images/hero-cake.png"
          alt="Авторский торт MarO с кремовой отделкой и цветочными акцентами"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </motion.div>
    </section>
  )
}
