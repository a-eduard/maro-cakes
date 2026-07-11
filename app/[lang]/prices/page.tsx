import { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { CakeBuilder } from '@/components/cake-builder'
import { OrderButton } from '@/components/order-button'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { getDictionary } from '@/lib/dictionaries'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as any)
  return {
    title: `${dict.header?.prices || 'Цены'} | MarO`,
    description: 'Каталог и цены на авторские торты, десерты и выпечку в кондитерской MarO. Закажите торт вашей мечты в Батуми.',
  }
}

interface Cake {
  _id: string
  title: string
  description?: string
  price: number
  oldPrice?: number
  image: any
}

export default async function PricesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as any)

  const cakesQuery = `*[_type == "cake"] | order(_createdAt desc) {
    _id,
    "title": coalesce(title[$lang], title.ru),
    "description": coalesce(description[$lang], description.ru),
    price,
    oldPrice,
    image
  }`
  const cakes: Cake[] = await client.fetch(cakesQuery, { lang }, { next: { revalidate: 60 } })

  const builderQuery = `*[_type == "cakeBuilder"][0] {
    ...,
    biscuits[] {
      ...,
      "name": coalesce(name[$lang], name.ru),
      "matchName": name.uk
    },
    fillings[] {
      ...,
      "name": coalesce(name[$lang], name.ru),
      "matchName": name.uk
    },
    decorations[] {
      ...,
      "name": coalesce(name[$lang], name.ru)
    }
  }`
  const builderData = await client.fetch(builderQuery, { lang }, { next: { revalidate: 60 } })

  const jsonLd = cakes.map((cake) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: cake.title,
    description: cake.description || 'Авторский торт на заказ',
    image: cake.image ? urlFor(cake.image).url() : 'https://maro-cakes.vercel.app/placeholder.svg',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GEL',
      price: cake.price,
      availability: 'https://schema.org/InStock',
      url: `https://maro-cakes.vercel.app/${lang}/prices`
    }
  }))

  return (
    <div className="relative flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <SiteHeader dict={dict.header} />
      
      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-16 text-center md:mb-24">
              <h1 className="font-serif text-5xl font-light leading-tight text-foreground md:text-6xl">
                {dict.header?.prices || 'Наши десерты и цены'}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                {dict.ui?.prices_subtitle || 'Каждый торт готовится индивидуально под ваш повод. Итоговая стоимость зависит от веса и сложности декора. Цена указана за килограмм.'}
              </p>
            </Reveal>

            {cakes.length > 0 ? (
              <div className="mb-32 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cakes.map((cake, i) => (
                  <Reveal key={cake._id} delay={(i % 4) * 0.1}>
                    <article className="group flex h-full flex-col">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                        <Image
                          src={cake.image ? urlFor(cake.image).url() : '/placeholder.svg'}
                          alt={cake.title || 'Торт'}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-grow flex-col pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-serif text-xl font-medium text-foreground">
                            {cake.title}
                          </h3>
                          <div className="flex flex-col items-end whitespace-nowrap">
                            {cake.oldPrice ? (
                              <span className="text-xs text-muted-foreground line-through">
                                {cake.oldPrice} ₾
                              </span>
                            ) : null}
                            <span className="text-lg font-semibold text-foreground">
                              {cake.price} ₾
                            </span>
                          </div>
                        </div>
                        {cake.description && (
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {cake.description}
                          </p>
                        )}
                        
                        {/* Интеграция кнопки вызова модального окна */}
                        <OrderButton cake={cake} dict={dict} />
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="mb-32 text-center text-muted-foreground">{dict.ui?.bestsellers_empty || 'Меню обновляется.'}</p>
            )}

            {builderData && (
              <Reveal>
                <div className="mb-12 text-center" id="constructor">
                  <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">
                    {dict.ui?.builder_title || 'Не нашли то, что искали?'}
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    {dict.ui?.builder_subtitle || 'Соберите свой идеальный торт в нашем конструкторе'}
                  </p>
                </div>
                
                <CakeBuilder data={builderData} dict={dict.ui} />
              </Reveal>
            )}

          </div>
        </section>
      </main>

      <SiteFooter lang={lang} dict={dict.ui} />
    </div>
  )
}