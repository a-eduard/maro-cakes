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
}

export async function Bestsellers() {
  // Выводим 8 позиций для главной страницы
  const query = `*[_type == "cake" && isBestseller == true] | order(_createdAt desc)[0...8] {
    _id,
    title,
    description,
    price,
    oldPrice,
    image
  }`

  const cakes: Cake[] = await client.fetch(query)

  return (
    <section id="bestsellers" className="px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Торты на заказ
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              Любимые торты наших гостей
            </h2>
          </div>
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Каждый торт готовится индивидуально под ваш повод. Цена указана за
            килограмм.
          </p>
        </Reveal>

        {cakes.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {cakes.map((cake, i) => (
              <Reveal key={cake._id} delay={(i % 4) * 0.1}>
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={cake.image ? urlFor(cake.image).url() : '/placeholder.svg'}
                      alt={cake.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col flex-grow pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-xl font-light text-foreground">
                        {cake.title}
                      </h3>
                      <div className="flex flex-col items-end whitespace-nowrap">
                        {cake.oldPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {cake.oldPrice} ₾
                          </span>
                        )}
                        <span className="text-sm font-medium text-foreground">
                          {cake.price} ₾
                        </span>
                      </div>
                    </div>
                    {cake.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {cake.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <a
                      href="#contacts"
                      className="inline-block text-sm tracking-wide text-muted-foreground underline-offset-8 transition-colors hover:text-rose-400 hover:underline"
                    >
                      Заказать
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Витрина пока пуста. Добавьте хиты продаж в панели управления.
          </p>
        )}

        <Reveal delay={0.4} className="mt-16 flex justify-center md:mt-24">
          <Link
            href="/prices"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm tracking-wide text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            Смотреть все цены
          </Link>
        </Reveal>
      </div>
    </section>
  )
}