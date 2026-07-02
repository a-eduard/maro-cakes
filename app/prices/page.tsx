import { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Цены на торты на заказ | MarO Батуми',
  description: 'Каталог и цены на авторские торты, десерты и выпечку в кондитерской MarO. Закажите торт вашей мечты в Батуми.',
}

interface Cake {
  _id: string
  title: string
  description?: string
  price: number
  oldPrice?: number
  image: any
}

export default async function PricesPage() {
  // Получаем ВСЕ торты и десерты из базы данных
  const query = `*[_type == "cake"] | order(_createdAt desc)`
  const cakes: Cake[] = await client.fetch(query)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-16 text-center md:mb-24">
              <h1 className="font-serif text-5xl font-light leading-tight text-foreground md:text-6xl">
                Наши десерты и цены
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Каждый торт готовится индивидуально под ваш повод. Итоговая стоимость зависит от веса и сложности декора. Цена указана за килограмм.
              </p>
            </Reveal>

            {cakes.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cakes.map((cake, i) => (
                  <Reveal key={cake._id} delay={(i % 4) * 0.1}>
                    <article className="group flex h-full flex-col">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                        <Image
                          src={cake.image ? urlFor(cake.image).url() : '/placeholder.svg'}
                          alt={cake.title}
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
                            {cake.oldPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                {cake.oldPrice} ₾
                              </span>
                            )}
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
                      </div>
                      <div className="mt-6">
                        <a
                          href="#contacts"
                          className="inline-flex h-10 w-full items-center justify-center rounded-full border border-rose-200 bg-rose-50/50 text-sm tracking-wide text-rose-950 transition-colors hover:bg-rose-400 hover:text-white"
                        >
                          Заказать
                        </a>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Меню обновляется.</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}