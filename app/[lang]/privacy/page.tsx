import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { getDictionary } from '@/lib/dictionaries'

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as any)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader dict={dict.header} />

      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-12 md:mb-16 border-b border-border/60 pb-8">
              <h1 className="font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
                {dict.privacy?.title || 'Политика конфиденциальности'}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-10 text-lg leading-relaxed text-muted-foreground">
                <p className="text-xl text-foreground font-light leading-relaxed">
                  {dict.privacy?.intro}
                </p>
                
                {dict.privacy?.blocks?.map((block: any, index: number) => (
                  <div key={index} className="flex flex-col gap-4">
                    <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">{block.h}</h2>
                    <p className="whitespace-pre-line">{block.p}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} dict={dict.ui} />
    </div>
  )
}