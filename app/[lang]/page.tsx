import { SiteHeader } from '@/components/site-header'
import { Gallery } from '@/components/gallery'
import { About } from '@/components/about'
import { Bestsellers } from '@/components/bestsellers'
import { Education } from '@/components/education'
import { Reviews } from '@/components/reviews'
import { SiteFooter } from '@/components/site-footer'
import { BoxLines } from '@/components/box-lines'
import { getDictionary } from '@/lib/dictionaries'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = lang || 'ru'
  const dict = await getDictionary(currentLang as any)

  return (
    <div className="relative">
      <BoxLines className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.07]" />

      <SiteHeader dict={dict.header} />
      <main className="overflow-hidden">
        <Gallery lang={currentLang} dict={dict.ui} />
        <About lang={currentLang} dict={dict.ui} />
        <Bestsellers lang={currentLang} dict={dict.ui} />
        <Education lang={currentLang} dict={dict.ui} />
        {/* Передаем dict.ui в отзывы */}
        <Reviews lang={currentLang} dict={dict.ui} /> 
      </main>
      <SiteFooter lang={currentLang} dict={dict.ui} />
    </div>
  )
}