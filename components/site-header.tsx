'use client'

import { useEffect, useState } from 'react'

const nav = [
  { label: 'Выпечка', href: '#directions' },
  { label: 'Торты', href: '#bestsellers' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Контакты', href: '#contacts' },
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
        <a
          href="#top"
          className="font-serif text-2xl font-medium tracking-[0.2em] text-foreground"
        >
          MarO
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacts"
          className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm tracking-wide text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25"
        >
          Заказать
        </a>
      </div>
    </header>
  )
}
