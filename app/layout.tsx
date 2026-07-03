import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Noto_Sans_Georgian, Cormorant_Garamond, Noto_Serif_Georgian } from 'next/font/google'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

// 1. Основной шрифт без засечек (Русский, Английский)
const manrope = Manrope({ 
  variable: '--font-manrope', 
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700']
})

// 2. Резервный шрифт без засечек (Грузинский)
const notoGeorgian = Noto_Sans_Georgian({ 
  variable: '--font-noto-georgian', 
  subsets: ['georgian'],
  weight: ['300', '400', '500', '600', '700']
})

// 3. Основной шрифт с засечками для заголовков (Русский, Английский)
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
})

// 4. Резервный шрифт с засечками для заголовков (Грузинский)
const notoSerifGeorgian = Noto_Serif_Georgian({
  variable: '--font-noto-serif-georgian',
  subsets: ['georgian'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'MarO — Авторские торты и десерты в Батуми',
  description:
    'Бутик-кондитерская MarO в Батуми: авторские торты на заказ из натуральных ингредиентов и обучение кондитерскому искусству.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f3efe7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      // Передаем все 4 CSS-переменные шрифтов в корневой тег
      className={`${manrope.variable} ${notoGeorgian.variable} ${cormorant.variable} ${notoSerifGeorgian.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}