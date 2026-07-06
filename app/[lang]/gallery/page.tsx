import { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { getDictionary } from '@/lib/dictionaries'

interface GalleryImage {
  _id: string
  title: string
  image: any
}

// Динамические метаданные для SEO
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as any)
  return {
    title: `${dict.header?.gallery || 'Галерея'} | MarO`,
    description: dict.ui?.gallery_desc || 'Авторские торты и десерты.',
  }
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as any)

  // Запрашиваем фото из базы с правильным языком
  const query = `*[_type == "gallery"] | order(order asc) {
    _id,
    "title": coalesce(title[$lang], title.ru),
    image
  }`
  const images: GalleryImage[] = await client.fetch(query, { lang }, { next: { revalidate: 60 } })

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader dict={dict.header} />
      
      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-4 sm:px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-16 text-center md:mb-24">
              <h1 className="font-serif text-5xl font-light leading-tight text-foreground md:text-6xl">
                {dict.header?.gallery || 'Галерея'}
              </h1>
            </Reveal>

            {images.length > 0 ? (
              <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[250px] sm:gap-5 md:auto-rows-[350px] md:grid-cols-3 md:gap-8">
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
            ) : (
              <p className="text-center text-muted-foreground">{dict.ui?.bestsellers_empty || 'Галерея пока пуста.'}</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} dict={dict.ui} />
    </div>
  )
}