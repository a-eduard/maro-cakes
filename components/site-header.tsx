'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const nav = [
  { label: 'Галерея', href: '/#gallery' },
  { label: 'О нас', href: '/#about' },
  { label: 'Цены', href: '/#bestsellers' },
  { label: 'Обучение', href: '/#education' },
  { label: 'Отзывы', href: '/#reviews' },
  { label: 'Блог', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Контакты', href: '/#contacts' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Отслеживаем скролл для появления матового фона у шапки
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Блокируем прокрутку страницы, когда мобильное меню открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ${
          scrolled || isOpen 
            ? 'bg-background/85 backdrop-blur-md border-b border-border/40 shadow-sm' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-12 md:py-6">
          <Link href="/" className="z-[1010] flex items-center" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.png"
              alt="Логотип авторской кондитерской MarO в Батуми"
              width={120}
              height={50}
              priority
              className="object-contain md:h-[60px] md:w-[140px]"
            />
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-block text-sm tracking-wide text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-rose-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#contacts"
              className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm tracking-wide text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-400 hover:shadow-lg hover:shadow-rose-400/25"
            >
              Заказать
            </a>
          </div>

          {/* Кнопка мобильного меню (Гамбургер / Крестик) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-[1010] p-2 text-foreground focus:outline-none lg:hidden"
            aria-label="Переключить меню"
          >
            {isOpen ? (
              <X className="h-7 w-7 stroke-[1.5]" />
            ) : (
              <Menu className="h-7 w-7 stroke-[1.5]" />
            )}
          </button>
        </div>
      </header>

      {/* Выпадающее мобильное меню с премиальным эффектом матового стекла */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[990] flex h-[100dvh] w-full flex-col overflow-y-auto bg-background/95 backdrop-blur-md px-6 pb-32 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-serif text-3xl font-light text-foreground transition-colors hover:text-rose-400"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-10 border-t border-border/60 pt-10">
                <a
                  href="#contacts"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-14 w-full items-center justify-center rounded-full bg-rose-400 px-6 text-lg tracking-wide text-white shadow-lg shadow-rose-400/20 transition-all hover:bg-rose-500"
                >
                  Оформить заказ
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}