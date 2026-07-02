import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export async function About() {
  // Запрашиваем документ "О нас" из Sanity
  const query = `*[_type == "about"][0]`
  const about = await client.fetch(query)

  // Если клиент еще не заполнил данные, не выводим блок, чтобы не ломать верстку
  if (!about) return null

  return (
    <section id="about" className="px-6 py-24 md:px-12 md:py-40 bg-accent/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
              <Image
                src={about.image ? urlFor(about.image).url() : '/placeholder.svg'}
                alt={about.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              О нас
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              {about.title}
            </h2>
            <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
              {about.description}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}