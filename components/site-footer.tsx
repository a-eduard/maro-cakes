import { MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Flourish } from '@/components/flourish'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'

export async function SiteFooter() {
  const query = `*[_type == "settings"][0]`
  const settings = await client.fetch(query)

  const data = {
    whatsapp: settings?.whatsapp || '+995 500 000 000',
    telegram: settings?.telegram || 'https://t.me/maro',
    instagram: settings?.instagram || 'https://instagram.com',
    address: settings?.address || 'Батуми, Грузия\nул. Приморская, 12',
    workingHours: settings?.workingHours || 'Ежедневно\n10:00 — 20:00'
  }

  const formatLink = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

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
          <Reveal className="flex flex-col gap-8">
            {/* Блок WhatsApp */}
            <div className="flex items-start gap-4">
              <MessageCircle
                className="mt-1.5 h-6 w-6 shrink-0 text-rose-400"
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light text-foreground md:text-3xl">
                  WhatsApp
                </span>
                <a
                  href={`tel:${data.whatsapp.replace(/[^0-9+]/g, '')}`}
                  className="mt-1 text-lg text-muted-foreground transition-colors hover:text-rose-400"
                >
                  {data.whatsapp}
                </a>
              </div>
            </div>

            {/* Блок Telegram */}
            <div className="flex items-start gap-4">
              <Send
                className="mt-1.5 h-6 w-6 shrink-0 text-rose-400"
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light text-foreground md:text-3xl">
                  Telegram
                </span>
                <a
                  href={data.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-lg text-muted-foreground transition-colors hover:text-rose-400"
                >
                  {formatLink(data.telegram)}
                </a>
              </div>
            </div>

            {/* Блок Instagram */}
            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1.5 h-6 w-6 shrink-0 text-rose-400"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light text-foreground md:text-3xl">
                  Instagram
                </span>
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-lg text-muted-foreground transition-colors hover:text-rose-400"
                >
                  {formatLink(data.instagram)}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-8 md:items-end">
            <div className="flex items-start gap-4 md:text-right">
              <MapPin
                className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground md:order-2"
                aria-hidden="true"
              />
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                {data.address}
              </p>
            </div>
            <div className="flex items-start gap-4 md:text-right">
              <Clock
                className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground md:order-2"
                aria-hidden="true"
              />
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                {data.workingHours}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 text-sm text-muted-foreground md:flex-row">
          <a href="#top" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Логотип авторской кондитерской MarO в Батуми"
              width={100}
              height={40}
              className="object-contain"
            />
          </a>
          <p>© {new Date().getFullYear()} MarO. Батуми, Грузия.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/faq"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Частые вопросы (FAQ)
            </Link>
            <span className="hidden md:inline text-border">|</span>
            <a
              href="#"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Политика конфиденциальности
            </a>
            <span className="hidden md:inline text-border">|</span>
            <a
              href="https://exapp.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wider transition-colors hover:text-foreground"
            >
              Создано IT-студией <span className="font-medium text-foreground">exapp.tech</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}