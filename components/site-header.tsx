'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useParams, useRouter } from 'next/navigation' // ДОБАВЛЕН useRouter
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown } from 'lucide-react'

const locales = [
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ka', label: 'GE', flag: '🇬🇪' },
  { code: 'uk', label: 'UK', flag: '🇺🇦' },
]

export function SiteHeader({ dict }: { dict: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter() // ИНИЦИАЛИЗАЦИЯ РОУТЕРА

  const currentLang = (params?.lang || params?.locale || 'ru') as string
  const currentFlag = locales.find(l => l.code === currentLang)?.flag || '🇷🇺'
  const displayLang = currentLang === 'ka' ? 'GE' : currentLang.toUpperCase()

  // ИСПРАВЛЕНА СМЕНА ЯЗЫКА: Плавный SPA-переход вместо жесткой перезагрузки
  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/')) 
    router.refresh() // Дает команду серверу обновить контент под новый язык без перезагрузки CSS/JS
  }

  const nav = [
    { label: dict?.gallery || 'Галерея', href: `/${currentLang}#gallery` },
    { label: dict?.about || 'О нас', href: `/${currentLang}#about` },
    { label: dict?.prices || 'Цены', href: `/${currentLang}#bestsellers` },
    { label: dict?.education || 'Обучение', href: `/${currentLang}#education` },
    { label: dict?.reviews || 'Отзывы', href: `/${currentLang}#reviews` },
    { label: dict?.blog || 'Блог', href: `/${currentLang}/blog` },
    { label: dict?.faq || 'FAQ', href: `/${currentLang}/faq` },
    { label: dict?.contacts || 'Контакты', href: `/${currentLang}#contacts` },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ${
          scrolled || isOpen ? 'bg-background/85 backdrop-blur-md border-b border-border/40 shadow-sm' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-12 md:py-6">
          <Link href={`/${currentLang}`} className="z-[1010] flex items-center" onClick={() => setIsOpen(false)}>
            <Image src="/logo.png" alt="MarO Logo" width={120} height={50} priority className="object-contain md:h-[60px] md:w-[140px]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="inline-block rounded-full px-5 py-2 text-sm tracking-wide text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-2 rounded-full border border-black/20 bg-black/5 px-4 py-2 text-sm font-bold text-black transition-all hover:bg-black/10">
                <span className="text-lg leading-none">{currentFlag}</span>
                <span>{displayLang}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full right-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                <div className="flex flex-col gap-2 rounded-2xl bg-white border border-black/10 p-3 shadow-xl min-w-[120px]">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold transition-colors text-left ${
                        currentLang === l.code ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                      }`}
                    >
                      <span className="text-lg leading-none">{l.flag}</span> 
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <a href={`/${currentLang}#contacts`} className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm tracking-wide text-primary-foreground transition-all hover:-translate-y-0.5">
              {dict?.order || 'Заказать'}
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="z-[1010] p-2 text-foreground focus:outline-none lg:hidden">
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>

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
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block font-serif text-3xl font-light text-foreground transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ))}
              
              <div className="mt-8 flex flex-wrap justify-center gap-6 border-t border-border/60 pt-8">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className={`flex items-center gap-2 text-lg font-medium uppercase transition-colors ${
                      currentLang === l.code ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{l.flag}</span> <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}