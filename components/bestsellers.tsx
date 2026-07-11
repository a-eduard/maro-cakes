import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { OrderButton } from '@/components/order-button'

interface Cake {
  _id: string
  title: string
  description?: string
  price: number
  oldPrice?: number
  image: any
  lqip?: string 
}

export async function Bestsellers({ lang, dict }: { lang: string; dict?: any }) {
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
        
        <Reveal className="mb-16 flex flex-col items-center text-center md:mb-24">
          <h2 className="text-balance font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
            {dict?.bestsellers_title || 'Flavour & Dessert Collection'}
          </h2>
          <p className="mt-6 max-w-3xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            {dict?.bestsellers_desc || 'Авторские вкусы и десерты, созданные для ваших особенных моментов. Цена указана за 1 кг торта или базовую стоимость десерта. Итоговая цена зависит от веса, количества и индивидуального декора вашего заказа.'}
          </p>
        </Reveal>

        {cakes.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4">
            {cakes.map((cake, i) => {
              const safeTitle = cake.title || 'Десерт'
              const safeDesc = cake.description || ''
              
              return (
              <Reveal key={cake._id} delay={(i % 4) * 0.1}>
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={cake.image ? urlFor(cake.image).url() : '/placeholder.svg'}
                      alt={safeTitle}
                      fill
                      priority={i < 2} 
                      placeholder={cake.lqip ? "blur" : "empty"} 
                      blurDataURL={cake.lqip} 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
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
                    
                    {/* Интеграция кнопки вызова модального окна */}
                    <OrderButton cake={cake} dict={dict} />
                  </div>
                </article>
              </Reveal>
            )})}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">{dict?.bestsellers_empty || 'Витрина пока пуста.'}</p>
        )}

        <Reveal delay={0.4} className="mt-12 flex justify-center sm:mt-16 md:mt-24">
          <Link
            href={`/${currentLang}/prices`} 
            className="inline-flex h-14 items-center justify-center rounded-full border border-border/80 bg-background px-10 text-sm font-medium tracking-wide text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#D4B76A]/50 hover:bg-[#D4B76A]/5 hover:text-[#D4B76A] hover:shadow-xl hover:shadow-[#D4B76A]/20 active:scale-95"
          >
            {dict?.bestsellers_btn || 'Посмотреть все торты'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}