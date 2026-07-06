import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { ChevronDown } from 'lucide-react'
import { getDictionary } from '@/lib/dictionaries'

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as any)
  
  const query = `*[_type == "faq"] | order(order asc) {
    _id,
    "question": coalesce(question[$lang], question.ru),
    "answer": coalesce(answer[$lang], answer.ru)
  }`
  const faqs = await client.fetch(query, { lang }, { next: { revalidate: 60 } })

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader dict={dict.header} />
      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-16 text-center">
              <h1 className="font-serif text-5xl font-light">{dict.header.faq}</h1>
              <p className="mt-6 text-muted-foreground">{dict.ui.faq_subtitle}</p>
            </Reveal>

            {faqs.map((faq: any) => (
              <details key={faq._id} className="mb-4 border border-border p-6 rounded-2xl">
                <summary className="cursor-pointer font-medium">{faq.question}</summary>
                <p className="mt-4 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} dict={dict.ui} />
    </div>
  )
}