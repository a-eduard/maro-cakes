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

export async function Gallery({ lang, dict }: { lang: string; dict?: any }) {
  const query = `*[_type == "gallery"] | order(order asc)[0...6] {
    _id,
    "title": coalesce(title[$lang], title.ru),
    image
  }`
  const images: GalleryImage[] = await client.fetch(query, { lang: lang || 'ru' })

  if (!images || images.length === 0) return null

  return (
    <section id="gallery" className="px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 md:px-12 md:pb-40 md:pt-48">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 text-center sm:mb-16 md:mb-24">
          <p className="mb-6 sm:mb-8 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {dict?.gallery_subtitle || 'Бутик-кондитерская · Батуми'}
          </p>
          <h1 className="mx-auto max-w-4xl text-balance font-serif text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl">
            {dict?.gallery_title || 'Авторские торты и десерты в Батуми'}
          </h1>
          <p className="mx-auto mt-6 sm:mt-8 max-w-xl text-pretty text-sm sm:text-base leading-relaxed text-muted-foreground md:text-lg">
            {dict?.gallery_desc || 'Натуральные ингредиенты. Индивидуальный дизайн. Авторские начинки.'}
          </p>
        </Reveal>

        <div className="grid auto-rows-[160px] min-[480px]:auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-5 md:auto-rows-[300px] md:grid-cols-3 md:gap-8">
          {images.map((img, i) => {
            const span = (i % 5 === 0 || i % 5 === 3) ? 'row-span-2' : ''
            return (
              <Reveal key={img._id} delay={(i % 3) * 0.1} className={`overflow-hidden rounded-[1rem] sm:rounded-[1.25rem] ${span}`}>
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

        <Reveal delay={0.4} className="mt-12 flex justify-center sm:mt-16 md:mt-24">
          <Link href={`/${lang}/gallery`} className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm tracking-wide text-foreground transition-all hover:bg-foreground hover:text-background">
            {dict?.gallery_btn || 'Смотреть всю галерею'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}