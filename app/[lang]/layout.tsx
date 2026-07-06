import type { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionaries'
import '@/app/globals.css'
import { CookieBanner } from '@/components/cookie-banner' // Именованный импорт

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
    "image": "https://maro-cakes.vercel.app/logo.png", // Убедись, что логотип есть в папке public
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
    <html lang={lang} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <CookieBanner lang={lang} dict={dict.ui} />
      </body>
    </html>
  )
}