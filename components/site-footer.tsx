import { MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Flourish } from '@/components/flourish'
import Image from 'next/image'
import Link from 'next/link'

export function SiteFooter({ lang, dict }: { lang: string; dict?: any }) {
  const data = {
    whatsapp: '+995 591 80 91 36',
    telegram: 'https://t.me/MarO_batumi',
    instagram: 'https://instagram.com',
    address: dict?.address || 'Батуми, Грузия\nул. Приморская, 12',
    workingHours: dict?.workingHours || 'Ежедневно\n10:00 — 20:00'
  }

  const formatLink = (url: string) => url ? url.replace(/^https?:\/\/(www\.)?/, '') : ''

  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-border px-6 pt-24 pb-12 md:px-12 md:pt-40">
      <Flourish flip className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-border/40" />

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {dict?.footer_subtitle || 'Контакты'}
          </p>
          <h2 className="max-w-2xl text-balance font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
            {dict?.footer_title || 'Расскажите о вашем торте мечты'}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-2">
          <Reveal className="flex flex-col gap-8">
            {/* WhatsApp */}
            <a href={`tel:${data.whatsapp.replace(/[^0-9+]/g, '')}`} className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-2">
              <MessageCircle className="mt-1.5 h-6 w-6 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-[#D4B76A]" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light text-foreground transition-colors duration-300 group-hover:text-[#D4B76A] md:text-3xl">WhatsApp</span>
                <span className="mt-1 text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {data.whatsapp}
                </span>
              </div>
            </a>

            {/* Telegram */}
            <a href={data.telegram} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-2">
              <Send className="mt-1.5 h-6 w-6 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-[#D4B76A]" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light text-foreground transition-colors duration-300 group-hover:text-[#D4B76A] md:text-3xl">Telegram</span>
                <span className="mt-1 text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {formatLink(data.telegram)}
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1.5 h-6 w-6 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-[#D4B76A]">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light text-foreground transition-colors duration-300 group-hover:text-[#D4B76A] md:text-3xl">Instagram</span>
                <span className="mt-1 text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {formatLink(data.instagram)}
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-8 md:items-end">
            <div className="flex items-start gap-4 md:text-right">
              <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground md:order-2" aria-hidden="true" />
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{data.address}</p>
            </div>
            <div className="flex items-start gap-4 md:text-right">
              <Clock className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground md:order-2" aria-hidden="true" />
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{data.workingHours}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 text-sm text-muted-foreground md:flex-row">
          <Link href={`/${lang}`} className="flex items-center transition-transform hover:scale-105">
            <Image src="/logo.png" alt="Logo" width={100} height={40} className="object-contain" />
          </Link>
          
          {/* Копирайт и ссылка на разработчика */}
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <p>© {new Date().getFullYear()} MarO.</p>
            <span className="hidden md:inline text-border">|</span>
            <p>
              Created by <a href="https://exapp.tech/" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground transition-colors hover:text-[#D4B76A]">exAPP</a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href={`/${lang}/faq`} className="underline-offset-4 transition-colors hover:text-[#D4B76A] hover:underline">
              {dict?.faq || 'Частые вопросы (FAQ)'}
            </Link>
            <span className="hidden md:inline text-border">|</span>
            <Link href={`/${lang}/privacy`} className="underline-offset-4 transition-colors hover:text-[#D4B76A] hover:underline">
              {dict?.privacy || 'Политика конфиденциальности'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}