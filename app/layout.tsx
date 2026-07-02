import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

// Используем Montserrat вместо Geist, сохраняя имя переменной, чтобы не ломать Tailwind
const montserrat = Montserrat({ 
  variable: '--font-geist-sans', 
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600']
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'cyrillic'],
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
      className={`${montserrat.variable} ${cormorant.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}