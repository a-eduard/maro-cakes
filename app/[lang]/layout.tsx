import type { Metadata } from 'next'
import { Noto_Serif_Georgian, Noto_Sans_Georgian } from 'next/font/google'
import { getDictionary } from '@/lib/dictionaries'
import '@/app/globals.css'
import { CookieBanner } from '@/components/cookie-banner'

// Настройка шрифта с засечками (для заголовков)
// Убрали 'cyrillic', так как TypeScript строго требует только доступные для этого шрифта сабсеты
const notoSerif = Noto_Serif_Georgian({
  subsets: ['latin', 'georgian'],
  variable: '--font-serif',
  display: 'swap',
})

// Настройка рубленого шрифта (для основного текста)
const notoSans = Noto_Sans_Georgian({
  subsets: ['latin', 'georgian'],
  variable: '--font-sans',
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as any)
  return {
    title: dict.seo?.title || 'MarO | Авторские торты в Батуми',
    description: dict.seo?.description || 'Авторские торты и десерты на заказ.',
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as any)
  
  // Формируем микроразметку для кондитерской
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "MarO Cakes & Desserts",
    "image": "https://maro-cakes.vercel.app/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Приморская, 12",
      "addressLocality": "Batumi",
      "addressCountry": "GE"
    },
    "telephone": "+995591809136",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ]
  }

  return (
    <html lang={lang} className={`${notoSerif.variable} ${notoSans.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      {/* Применяем основной шрифт к body */}
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <CookieBanner lang={lang} dict={dict.ui} />
      </body>
    </html>
  )
}