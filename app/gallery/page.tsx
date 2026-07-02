import { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Галерея десертов | MarO Батуми',
  description: 'Фотографии наших авторских тортов, десертов и процесса работы в кондитерской студии MarO в Батуми.',
}

interface GalleryImage {
  _id: string
  title: string
  image: any
}

export default async function GalleryPage() {
  // Получаем ВСЕ фотографии из галереи
  const query = `*[_type == "gallery"] | order(order asc)`
  const images: GalleryImage[] = await client.fetch(query)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-16 text-center md:mb-24">
              <h1 className="font-serif text-5xl font-light leading-tight text-foreground md:text-6xl">
                Галерея наших работ
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Вдохновляйтесь нашими лучшими тортами и десертами, созданными с любовью в Батуми.
              </p>
            </Reveal>

            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {images.map((img, i) => (
                  <Reveal key={img._id} delay={(i % 4) * 0.1}>
                    <div className="group relative aspect-square w-full overflow-hidden rounded-2xl">
                      <Image
                        src={img.image ? urlFor(img.image).url() : '/placeholder.svg'}
                        alt={img.title || 'Фото из галереи MarO'}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Фотографии скоро появятся.</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}