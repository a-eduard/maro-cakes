import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface Cake {
  _id: string
  title: string
  description?: string
  price: number
  oldPrice?: number
  image: any
  lqip?: string // Добавили поле для размытого превью
}

export async function Bestsellers({ lang, dict }: { lang: string; dict?: any }) {
  // Добавили "lqip": image.asset->metadata.lqip в запрос
  const query = `*[_type == "cake" && isBestseller == true] | order(_createdAt desc)[0...8] {
    _id,
    "title": coalesce(title[$lang], title.ru),
    "description": coalesce(description[$lang], description.ru),
    price,
    oldPrice,
    image,
    "lqip": image.asset->metadata.lqip
  }`

  const currentLang = lang || 'ru'
  const cakes: Cake[] = await client.fetch(
    query, 
    { lang: currentLang }, 
    { next: { revalidate: 60 } } 
  )

  return (
    <section id="bestsellers" className="px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16 sm:gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 sm:mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              {dict?.bestsellers_overtitle || 'Торты на заказ'}
            </p>
            <h2 className="text-balance font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl md:text-5xl">
              {dict?.bestsellers_title || 'Любимые торты наших гостей'}
            </h2>
          </div>
        </Reveal>

        {cakes.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4">
            {cakes.map((cake, i) => {
              const safeTitle = cake.title || 'Торт'
              const safeDesc = cake.description || ''
              
              return (
              <Reveal key={cake._id} delay={(i % 4) * 0.1}>
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={cake.image ? urlFor(cake.image).url() : '/placeholder.svg'}
                      alt={safeTitle}
                      fill
                      priority={i < 2} // Высший приоритет только для первых 2 фото
                      placeholder={cake.lqip ? "blur" : "empty"} // Включаем блюр
                      blurDataURL={cake.lqip} // Передаем данные блюра
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" // Оптимизировали sizes
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-grow flex-col pt-5 sm:pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-lg sm:text-xl font-light">{safeTitle}</h3>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium">{cake.price || 0} ₾</span>
                      </div>
                    </div>
                    {safeDesc && <p className="line-clamp-2 mt-2 text-sm text-muted-foreground">{safeDesc}</p>}
                  </div>
                </article>
              </Reveal>
            )})}
          </div>
        ) : (
          <p className="text-muted-foreground">{dict?.bestsellers_empty || 'Витрина пока пуста.'}</p>
        )}

        <Reveal delay={0.4} className="mt-12 flex justify-center sm:mt-16 md:mt-24">
          <Link
            href={`/${currentLang}/prices`} 
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm tracking-wide text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            {dict?.bestsellers_btn || 'Посмотреть все торты'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}