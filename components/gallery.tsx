import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const images = [
  { src: '/images/gallery-1.png', alt: 'Свадебный торт с сахарными цветами', span: 'row-span-2' },
  { src: '/images/gallery-3.png', alt: 'Ассорти мини-десертов на мраморе', span: '' },
  { src: '/images/gallery-2.png', alt: 'Разрез торта с кремовыми слоями', span: '' },
  { src: '/images/gallery-5.png', alt: 'Многоярусный торт с золотым декором', span: 'row-span-2' },
  { src: '/images/gallery-4.png', alt: 'Украшение торта живым цветком', span: '' },
  { src: '/images/gallery-6.png', alt: 'Тарты с глянцевой фруктовой начинкой', span: '' },
]

export function Gallery() {
  return (
    <section id="gallery" className="px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center md:mb-24">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Галерея
          </p>
          <h2 className="mx-auto max-w-2xl text-balance font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
            Вдохновение из нашей студии
          </h2>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-5 md:auto-rows-[300px] md:grid-cols-3 md:gap-8">
          {images.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 3) * 0.1}
              className={`overflow-hidden rounded-[1.25rem] ${img.span}`}
            >
              <div className="group relative h-full w-full">
                <Image
                  src={img.src || '/placeholder.svg'}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
