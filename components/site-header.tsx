'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown } from 'lucide-react'

const locales = [
  { code: 'ru', label: 'RU', flag: '/assets/flags/flag-ru.png' },
  { code: 'en', label: 'EN', flag: '/assets/flags/flag-en.png' },
  { code: 'ka', label: 'GE', flag: '/assets/flags/flag-ge.png' },
  { code: 'uk', label: 'UK', flag: '/assets/flags/flag-ua.png' },
]

export function SiteHeader({ dict }: { dict: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()

  const currentLang = (params?.lang || params?.locale || 'ru') as string
  const currentFlag = locales.find(l => l.code === currentLang)?.flag || '/assets/flags/flag-ru.png'
  const displayLang = currentLang === 'ka' ? 'GE' : currentLang.toUpperCase()

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/')) 
    router.refresh()
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

  // Переменная для контроля цвета в зависимости от скролла или открытого мобильного меню
  const isDark = scrolled || isOpen

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[1000] transition-colors duration-500 ${
          isDark ? 'bg-zinc-950 border-b border-white/10 shadow-lg' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-12 md:py-6">
          <Link href={`/${currentLang}`} className="z-[1010] flex items-center transition-all duration-300" onClick={() => setIsOpen(false)}>
            {/* Если скролл есть — делаем лого белым, если нет — оставляем оригинальным */}
            <Image 
              src="/logo.png" 
              alt="MarO Logo" 
              width={120} 
              height={50} 
              priority 
              className={`w-auto h-auto object-contain md:h-[60px] md:w-[140px] transition-all duration-300 ${isDark ? 'brightness-0 invert' : ''}`} 
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={`inline-block px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-black'
              }`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <button className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 ${
                isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-black/5 bg-black/5 text-black hover:bg-black/10'
              }`}>
                <Image src={currentFlag} alt="flag" width={20} height={20} className="rounded-full object-cover shadow-sm" />
                <span>{displayLang}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full right-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className={`flex flex-col gap-1 rounded-2xl border p-2 min-w-[140px] ${
                  isDark ? 'bg-zinc-900 border-white/10 shadow-2xl' : 'bg-white border-black/5 shadow-xl'
                }`}>
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all text-left ${
                        currentLang === l.code 
                          ? (isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black')
                          : (isDark ? 'text-zinc-400 hover:bg-white/5 hover:text-white' : 'text-zinc-600 hover:bg-black/5 hover:text-black')
                      }`}
                    >
                      <Image src={l.flag} alt={l.label} width={20} height={20} className="rounded-full object-cover shadow-sm" />
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Золотая кнопка Заказать с единой анимацией */}
            <a href={`/${currentLang}#contacts`} className="inline-flex h-10 items-center justify-center rounded-full bg-[#D4B76A] px-8 text-sm font-bold tracking-wide text-zinc-950 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4B76A]/20 active:scale-95">
              {dict?.order || 'Заказать'}
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={`z-[1010] p-2 focus:outline-none lg:hidden ${isDark ? 'text-white' : 'text-black'}`}>
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
            className="fixed inset-0 z-[990] flex h-[100dvh] w-full flex-col overflow-y-auto bg-zinc-950 px-6 pb-32 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block font-serif text-3xl font-light text-zinc-300 transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
              
              <div className="mt-8 flex flex-wrap justify-center gap-6 border-t border-white/10 pt-8">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className={`flex items-center gap-2 text-lg font-medium uppercase transition-all ${
                      currentLang === l.code ? 'text-white font-bold scale-110' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Image src={l.flag} alt={l.label} width={24} height={24} className="rounded-full shadow-sm" /> 
                    <span>{l.label}</span>
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