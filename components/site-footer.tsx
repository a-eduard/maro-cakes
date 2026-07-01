import { MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Flourish } from '@/components/flourish'
import Image from 'next/image'

export function SiteFooter() {
  return (
    <footer
      id="contacts"
      className="relative overflow-hidden border-t border-border px-6 pt-24 pb-12 md:px-12 md:pt-40"
    >
      <Flourish
        flip
        className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-line/40"
      />

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Контакты
          </p>
          <h2 className="max-w-2xl text-balance font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
            Расскажите о вашем торте мечты
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <a
              href="https://wa.me/995500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 font-serif text-2xl font-light text-foreground transition-colors hover:text-accent md:text-3xl"
            >
              <MessageCircle
                className="h-6 w-6 text-accent transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
              WhatsApp
            </a>
            <a
              href="https://t.me/maro"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 font-serif text-2xl font-light text-foreground transition-colors hover:text-accent md:text-3xl"
            >
              <Send
                className="h-6 w-6 text-accent transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
              Telegram
            </a>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-8 md:items-end">
            <div className="flex items-start gap-4 md:text-right">
              <MapPin
                className="mt-1 h-5 w-5 shrink-0 text-muted-foreground md:order-2"
                aria-hidden="true"
              />
              <p className="leading-relaxed text-muted-foreground">
                Батуми, Грузия
                <br />
                ул. Приморская, 12
              </p>
            </div>
            <div className="flex items-start gap-4 md:text-right">
              <Clock
                className="mt-1 h-5 w-5 shrink-0 text-muted-foreground md:order-2"
                aria-hidden="true"
              />
              <p className="leading-relaxed text-muted-foreground">
                Ежедневно
                <br />
                10:00 — 20:00
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 text-sm text-muted-foreground md:flex-row">
        <a href="#top" className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="Логотип авторской кондитерской MarO в Батуми"
              width={100}
              height={40}
              className="object-contain"
            />
          </a>
          <p>© {new Date().getFullYear()} MarO. Батуми, Грузия.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
