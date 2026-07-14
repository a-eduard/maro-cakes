import type { Metadata } from 'next'
import { Manrope, Noto_Sans_Georgian } from 'next/font/google'
import { getDictionary } from '@/lib/dictionaries'
import '@/app/globals.css'
import { CookieBanner } from '@/components/cookie-banner'
import { WatermarkLines } from '@/components/watermark-lines' 

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'], 
  variable: '--font-manrope',
  display: 'swap',
})

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  weight: ['400', '500', '600'],
  variable: '--font-georgian',
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
    // Теперь заголовок динамически подтягивается из словаря
    title: dict.ui?.seo_title || 'MarO | Авторские торты',
    description: dict.ui?.gallery_desc || 'Авторские торты и десерты на заказ.',
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
    <html lang={lang} className={`${manrope.variable} ${notoSansGeorgian.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      {/* Добавлен font-medium, чтобы вес 500 применялся ко всему тексту по умолчанию */}
      <body className="font-sans font-medium antialiased bg-white text-[#3F372F] relative z-0">
        
        <WatermarkLines /> 
        
        <div className="relative z-10">
          {children}
        </div>
        
        <CookieBanner lang={lang} dict={dict.ui} />
      </body>
    </html>
  )
}