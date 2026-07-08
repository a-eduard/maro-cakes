import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { Star } from 'lucide-react'

interface Review {
  _id: string
  name: string
  text: string
  rating: number
}

export async function Reviews({ lang, dict }: { lang: string; dict?: any }) {
  const query = `*[_type == "review"] | order(_createdAt desc)[0...3] {
    _id,
    "name": coalesce(name[$lang], name.ru),
    "text": coalesce(text[$lang], text.ru),
    rating
  }`
  const reviews: Review[] = await client.fetch(query, { lang: lang || 'ru' }, { next: { revalidate: 60 } })

  if (!reviews || reviews.length === 0) return null

  return (
    <section id="reviews" className="px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 sm:mb-16 md:mb-24">
          <p className="mb-4 sm:mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {dict?.reviews_overtitle || 'Отзывы'}
          </p>
          <h2 className="font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl md:text-5xl">
            {dict?.reviews_title || 'Что говорят наши гости'}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review._id} delay={(i % 3) * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-border/60 bg-accent/5 p-6 sm:p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                <div>
                  <div className="mb-6 sm:mb-8 flex gap-1">
                    {[...Array(review.rating)].map((_, index) => (
                      <Star 
                        key={index} 
                        className="h-4 w-4 fill-[#d4b76a] text-[#d4b76a]" 
                        aria-hidden="true" 
                      />
                    ))}
                  </div>
                  <p className="mb-6 sm:mb-8 font-serif text-lg sm:text-xl italic leading-relaxed text-foreground/80 line-clamp-6">
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

        <Reveal delay={0.4} className="mt-12 flex justify-center sm:mt-16 md:mt-24">
          <Link
            href={`/${lang}/reviews`}
            className="inline-flex h-14 items-center justify-center rounded-full border border-border/80 bg-background px-10 text-sm font-medium tracking-wide text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#D4B76A]/50 hover:bg-[#D4B76A]/5 hover:text-[#D4B76A] hover:shadow-xl hover:shadow-[#D4B76A]/20 active:scale-95"
          >
            {dict?.reviews_btn || 'Читать все отзывы'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}