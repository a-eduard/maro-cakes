'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'

const nav = [
  { label: 'Галерея', href: '/#gallery' },
  { label: 'О нас', href: '/#about' },
  { label: 'Цены', href: '/#bestsellers' },
  { label: 'Обучение', href: '/#education' },
  { label: 'Отзывы', href: '/#reviews' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '/#contacts' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-background/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 md:py-8">
      <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Логотип авторской кондитерской MarO в Батуми"
            width={140}
            height={60}
            priority
            className="object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
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

        <a
          href="#contacts"
          className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm tracking-wide text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-400 hover:shadow-lg hover:shadow-rose-400/25"
        >
          Заказать
        </a>
      </div>
    </header>
  )
}