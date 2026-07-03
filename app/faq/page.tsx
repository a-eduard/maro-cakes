import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - Ответы на частые вопросы | MarO Батуми',
  description: 'Всё, что нужно знать о заказе тортов в MarO: сроки изготовления, доставка, оплата и состав наших десертов.',
}

interface FAQItem {
  _id: string
  question: string
  answer: string
}

export default async function FAQPage() {
  // Запрашиваем вопросы, сортируя по полю order
  const query = `*[_type == "faq"] | order(order asc)`
  const faqs: FAQItem[] = await client.fetch(query)

  // Формируем микроразметку Schema.org для Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Добавляем скрытый скрипт микроразметки для поисковиков */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <SiteHeader />

      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-16 text-center md:mb-24">
              <h1 className="font-serif text-5xl font-light leading-tight text-foreground md:text-6xl">
                Частые вопросы
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Мы собрали ответы на самые популярные вопросы, чтобы вам было проще сделать заказ.
              </p>
            </Reveal>

            {faqs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => (
                  <Reveal key={faq._id} delay={index * 0.1}>
                    {/* Используем встроенный в HTML элемент details для аккордеона */}
                    <details className="group rounded-[1.5rem] border border-border/60 bg-accent/5 p-6 transition-colors hover:border-rose-200">
                      <summary className="flex cursor-pointer items-center justify-between font-serif text-xl font-medium text-foreground outline-none marker:content-none">
                        {faq.question}
                        <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 transition-transform duration-300 group-open:rotate-180 group-open:border-rose-400 group-open:text-rose-400">
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </summary>
                      <div className="mt-4 pr-12 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Вопросы пока не добавлены.</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}