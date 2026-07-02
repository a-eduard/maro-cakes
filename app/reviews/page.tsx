import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Отзывы клиентов | MarO Батуми',
  description: 'Что говорят наши гости об авторских тортах, десертах и мастер-классах в кондитерской MarO.',
}

interface Review {
  _id: string
  name: string
  text: string
  rating: number
}

export default async function ReviewsPage() {
  // Получаем ВСЕ отзывы
  const query = `*[_type == "review"] | order(_createdAt desc)`
  const reviews: Review[] = await client.fetch(query)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-16 text-center md:mb-24">
              <h1 className="font-serif text-5xl font-light leading-tight text-foreground md:text-6xl">
                Отзывы наших гостей
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Спасибо, что доверяете нам свои самые важные праздники и делитесь эмоциями.
              </p>
            </Reveal>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, i) => (
                  <Reveal key={review._id} delay={(i % 3) * 0.1}>
                    <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-border/60 bg-accent/5 p-10 transition-all duration-500 hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-100/30">
                      <div>
                        <div className="mb-8 flex gap-1">
                          {[...Array(review.rating)].map((_, index) => (
                            <Star 
                              key={index} 
                              className="h-4 w-4 fill-[#d4b76a] text-[#d4b76a]" 
                              aria-hidden="true" 
                            />
                          ))}
                        </div>
                        <p className="mb-8 font-serif text-xl italic leading-relaxed text-foreground/80">
                          "{review.text}"
                        </p>
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                        — {review.name}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Здесь скоро появятся отзывы.</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}