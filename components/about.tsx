import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export async function About({ lang, dict }: { lang: string; dict?: any }) {
  const query = `*[_type == "about"][0] {
    "title": coalesce(title[$lang], title.ru),
    "description": coalesce(description[$lang], description.ru),
    image
  }`
  
  const currentLang = lang || 'ru'
  const about = await client.fetch(query, { lang: currentLang }, { next: { revalidate: 60 } })

  if (!about) return null

  const titleText = about.title || dict?.about_title || 'О кондитерской MarO'
  const descText = about.description || dict?.about_desc || ''

  return (
    // Убрали классы фона (bg-[#FCFBFA]) и границ, чтобы блок стал прозрачным
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] shadow-sm">
              <Image
                src={about.image ? urlFor(about.image).url() : '/placeholder.svg'}
                alt={titleText}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="flex flex-col gap-4 sm:gap-6">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              {dict?.about_tag || 'О нас'}
            </p>
            <h2 className="font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl md:text-5xl">
              {titleText}
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-muted-foreground text-lg">
              {descText}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}