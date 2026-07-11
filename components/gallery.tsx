import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface GalleryImage {
  _id: string
  title: string
  image: any
  lqip?: string 
}

export async function Gallery({ lang, dict }: { lang: string; dict?: any }) {
  const query = `*[_type == "gallery"] | order(order asc)[0...6] {
    _id,
    "title": coalesce(title[$lang], title.ru),
    image,
    "lqip": image.asset->metadata.lqip 
  }`
  const images: GalleryImage[] = await client.fetch(query, { lang: lang || 'ru' }, { next: { revalidate: 60 } })

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

        <div className="grid auto-rows-[180px] min-[480px]:auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] sm:gap-6 md:auto-rows-[340px] md:grid-cols-3 md:gap-8">
          {images.map((img, i) => {
            const span = (i === 0 || i === 3 || i === 4) ? 'row-span-2' : ''
            return (
              <Reveal key={img._id} delay={(i % 3) * 0.1} className={`overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${span}`}>
                <div className="group relative h-full w-full">
                  <Image
                    src={img.image ? urlFor(img.image).url() : '/placeholder.svg'}
                    alt={img.title || 'Фото из галереи'}
                    fill
                    priority={i < 2} 
                    placeholder={img.lqip ? "blur" : "empty"} 
                    blurDataURL={img.lqip} 
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.4} className="mt-12 flex justify-center sm:mt-16 md:mt-24">
          <Link 
            href={`/${lang}/gallery`} 
            className="inline-flex h-14 items-center justify-center rounded-full border border-border/80 bg-background px-10 text-sm font-medium tracking-wide text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#D4B76A]/50 hover:bg-[#D4B76A]/5 hover:text-[#D4B76A] hover:shadow-xl hover:shadow-[#D4B76A]/20 active:scale-95"
          >
            {dict?.gallery_btn || 'Смотреть всю галерею'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}