import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const cakes = [
  {
    name: 'Ванильный с ягодами',
    price: '160 ₾',
    image: '/images/cake-1.png',
    alt: 'Ванильный бисквитный торт со свежими ягодами',
  },
  {
    name: 'Шоколадный ганаш',
    price: '180 ₾',
    image: '/images/cake-2.png',
    alt: 'Шоколадный торт с глянцевым ганашем и золотым акцентом',
  },
  {
    name: 'Клубничный мусс',
    price: '175 ₾',
    image: '/images/cake-3.png',
    alt: 'Нежный клубничный муссовый торт',
  },
  {
    name: 'Фисташковый',
    price: '190 ₾',
    image: '/images/cake-4.png',
    alt: 'Фисташковый торт с зелёным кремом',
  },
]

export function Bestsellers() {
  return (
    <section id="bestsellers" className="px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Торты на заказ
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              Любимые начинки наших гостей
            </h2>
          </div>
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Каждый торт готовится индивидуально под ваш повод. Цена указана за
            килограмм.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {cakes.map((cake, i) => (
            <Reveal key={cake.name} delay={(i % 4) * 0.1}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={cake.image || '/placeholder.svg'}
                    alt={cake.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-baseline justify-between pt-6">
                  <h3 className="font-serif text-xl font-light text-foreground">
                    {cake.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {cake.price}
                  </span>
                </div>
                <a
                  href="#contacts"
                  className="mt-3 inline-block text-sm tracking-wide text-muted-foreground underline-offset-8 transition-colors hover:text-accent hover:underline"
                >
                  Заказать
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
