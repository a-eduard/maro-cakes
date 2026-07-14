'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown } from 'lucide-react'

const locales = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'ka', label: 'GE' },
  { code: 'uk', label: 'UK' },
]

export function SiteHeader({ dict }: { dict: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()

  const currentLang = (params?.lang || params?.locale || 'ru') as string
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
    { label: dict?.reviews || 'Отзывы', href: `/${currentLang}/reviews` },
    { label: dict?.blog || 'Блог', href: `/${currentLang}/blog` },
  ]
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[1000] bg-white font-sans transition-all duration-500 ${
          scrolled ? 'shadow-sm border-b border-[#3F372F]/5' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-12 md:py-6">
          <Link href={`/${currentLang}`} className="z-[1010] flex items-center transition-all duration-300" onClick={() => setIsOpen(false)}>
            <Image 
              src="/logo.png" 
              alt="MarO Logo" 
              width={120} 
              height={50} 
              priority 
              className="w-[100px] sm:w-[120px] md:h-[60px] md:w-[140px] h-auto object-contain transition-all duration-300" 
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="inline-block px-4 py-2 text-sm font-medium tracking-wide text-[#5A524A] transition-colors hover:text-[#3F372F]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-2 rounded-full px-2 py-2 text-sm font-medium text-[#5A524A] transition-all duration-300 hover:text-[#3F372F]">
                <span>{displayLang}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full right-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="flex flex-col gap-1 rounded-2xl border border-[#3F372F]/5 bg-white p-2 min-w-[100px] shadow-xl">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`flex w-full items-center justify-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all text-center ${
                        currentLang === l.code 
                          ? 'bg-[#F3D35F]/20 text-[#3F372F]'
                          : 'text-[#5A524A] hover:bg-[#F3D35F]/10 hover:text-[#3F372F]'
                      }`}
                    >
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <a href={`/${currentLang}#contacts`} className="inline-block px-4 py-2 text-sm font-medium tracking-wide text-[#5A524A] transition-colors hover:text-[#3F372F]">
              {dict?.order || 'Заказать'}
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="z-[1010] p-2 focus:outline-none lg:hidden text-[#3F372F]">
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
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
            className="fixed inset-0 z-[990] flex h-[100dvh] w-full flex-col overflow-y-auto bg-white px-6 pb-24 pt-28 lg:hidden font-sans"
          >
            <nav className="flex flex-col gap-8">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block font-sans text-3xl font-medium text-[#5A524A] transition-colors hover:text-[#3F372F]">
                  {item.label}
                </Link>
              ))}
              
              <div className="mt-4 flex flex-wrap justify-start gap-4 border-t border-[#3F372F]/10 pt-8">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      currentLang === l.code ? 'bg-[#F3D35F] text-[#3F372F] border-[#D6AD1C]' : 'bg-transparent text-[#5A524A] border-[#3F372F]/20 hover:text-[#3F372F]'
                    }`}
                  >
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