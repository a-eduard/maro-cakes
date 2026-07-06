'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'

export interface CookieBannerProps {
  dict?: any
  lang: string
}

export function CookieBanner({ dict, lang }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('maro-cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('maro-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:bottom-6 sm:left-6 sm:right-auto"
        >
          <div className="flex max-w-sm flex-col gap-4 rounded-2xl border border-border/60 bg-background/95 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {dict?.cookies_text || 'Мы используем файлы cookie для улучшения работы сайта и аналитики. Продолжая использовать сайт, вы соглашаетесь с нашей '}{' '}
              <Link href={`/${lang}/privacy`} className="text-foreground underline underline-offset-4 hover:text-brand-400">
                {dict?.cookies_policy || 'Политикой конфиденциальности'}
              </Link>.
            </p>
            <button
              onClick={acceptCookies}
              className="w-full rounded-full bg-brand-400 px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-500"
            >
              {dict?.cookies_accept || 'Согласен'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}