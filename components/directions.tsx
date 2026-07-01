import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Flourish } from '@/components/flourish'

const directions = [
  {
    tag: '01',
    title: 'Выпечка',
    description:
      'Торты и десерты на заказ для особых моментов. Индивидуальный дизайн, авторские начинки и только натуральные ингредиенты.',
    image: '/images/direction-pastry.png',
    imageAlt: 'Кондитер выравнивает крем на торте',
    tall: true,
  },
  {
    tag: '02',
    title: 'Обучение',
    description:
      'Индивидуальные и групповые мастер-классы. Научитесь работать с кремом, бисквитом и декором в спокойной студийной атмосфере.',
    image: '/images/direction-education.png',
    imageAlt: 'Руки кондитера отсаживают крем на мастер-классе',
    tall: false,
  },
]

export function Directions() {
  return (
    <section id="directions" className="relative px-6 py-24 md:px-12 md:py-40">
      <Flourish className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-line/40" />

      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-2xl md:mb-24">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Два направления
          </p>
          <h2 className="text-balance font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
            Мы создаём десерты и делимся мастерством
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {directions.map((d, i) => (
            <Reveal
              key={d.title}
              delay={i * 0.12}
              className={
                i === 1 ? 'md:mt-24' : undefined /* asymmetrical offset */
              }
            >
              <article className="group flex h-full flex-col">
                <div
                  className={`relative overflow-hidden rounded-[1.75rem] ${
                    d.tall ? 'aspect-[4/5]' : 'aspect-[4/5] md:aspect-[5/6]'
                  }`}
                >
                  <Image
                    src={d.image || '/placeholder.svg'}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col pt-8">
                  <span className="text-xs tracking-[0.3em] text-accent">
                    {d.tag}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl font-light text-foreground md:text-4xl">
                    {d.title}
                  </h3>
                  <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
                    {d.description}
                  </p>
                  <a
                    href="#contacts"
                    className="mt-8 inline-flex items-center gap-2 text-sm tracking-wide text-foreground transition-colors hover:text-accent"
                  >
                    Заказать
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
