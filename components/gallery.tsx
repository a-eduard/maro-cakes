import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface GalleryImage {
  _id: string
  title: string
  image: any
}

export async function Gallery() {
  // Ограничиваем запрос до 6 изображений для главной страницы
  const query = `*[_type == "gallery"] | order(order asc)[0...6]`
  const images: GalleryImage[] = await client.fetch(query)

  if (!images || images.length === 0) return null

  return (
    <section id="gallery" className="px-6 pb-24 pt-36 md:px-12 md:pb-40 md:pt-48">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center md:mb-24">
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Бутик-кондитерская · Батуми
          </p>
          <h1 className="mx-auto max-w-4xl text-balance font-serif text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Авторские торты и десерты в Батуми
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Натуральные ингредиенты. Индивидуальный дизайн. Авторские начинки.
          </p>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-5 md:auto-rows-[300px] md:grid-cols-3 md:gap-8">
          {images.map((img, i) => {
            const span = (i % 5 === 0 || i % 5 === 3) ? 'row-span-2' : ''
            
            return (
              <Reveal
                key={img._id}
                delay={(i % 3) * 0.1}
                className={`overflow-hidden rounded-[1.25rem] ${span}`}
              >
                <div className="group relative h-full w-full">
                  <Image
                    src={img.image ? urlFor(img.image).url() : '/placeholder.svg'}
                    alt={img.title || 'Фото из галереи'}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.4} className="mt-16 flex justify-center md:mt-24">
          <Link
            href="/gallery"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm tracking-wide text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            Смотреть всю галерею
          </Link>
        </Reveal>
      </div>
    </section>
  )
}