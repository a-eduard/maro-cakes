import { Reveal } from '@/components/reveal'
import { Flourish } from '@/components/flourish'
import Image from 'next/image'
import Link from 'next/link'

export function SiteFooter({ lang, dict }: { lang: string; dict?: any }) {
  const data = {
    whatsapp: '+995 591 80 91 36',
    telegram: 'https://t.me/MarO_batumi',
    instagram: 'https://instagram.com/maro_batumi',
    address: 'Батуми, Грузия, ул. Приморская, 12',
    workingHours: '10:00 — 20:00'
  }

  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-border px-6 pt-24 pb-12 md:px-12 md:pt-40">
      <Flourish flip className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-border/40" />

      <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
        <Reveal>
          <h2 className="font-serif text-5xl font-light text-foreground md:text-7xl">
            {dict?.footer_title || 'Contacts'}
          </h2>
          {/* Красная волнистая линия удалена отсюда */}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col items-center justify-center gap-12 md:mt-24 md:flex-row md:gap-32">
            {/* Instagram */}
            <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1">
              <span className="font-serif text-3xl font-light text-foreground transition-colors duration-300 group-hover:text-[#D4B76A] md:text-4xl">Instagram</span>
              <span className="text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                @maro_batumi
              </span>
            </a>

            {/* WhatsApp */}
            <a href={`tel:${data.whatsapp.replace(/[^0-9+]/g, '')}`} className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1">
              <span className="font-serif text-3xl font-light text-foreground transition-colors duration-300 group-hover:text-[#D4B76A] md:text-4xl">WhatsApp</span>
              <span className="text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {data.whatsapp}
              </span>
            </a>

            {/* Telegram */}
            <a href={data.telegram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1">
              <span className="font-serif text-3xl font-light text-foreground transition-colors duration-300 group-hover:text-[#D4B76A] md:text-4xl">Telegram</span>
              <span className="text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                @MarO_batumi
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col items-center gap-2 text-center text-lg leading-relaxed text-muted-foreground md:mt-24">
            <p>{data.address}</p>
            <p>{data.workingHours}</p>
          </div>
        </Reveal>

        {/* Нижняя полоса с копирайтом */}
        <div className="mt-24 flex w-full flex-col items-center justify-between gap-6 border-t border-border pt-10 text-sm text-muted-foreground md:flex-row">
          <Link href={`/${lang}`} className="flex items-center transition-transform hover:scale-105">
            <Image src="/logo.png" alt="Logo" width={100} height={40} className="object-contain" />
          </Link>
          
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