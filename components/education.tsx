import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface EducationProps {
  isDetailedView?: boolean
  lang: string
  dict?: any
}

export async function Education({ isDetailedView = false, lang, dict }: EducationProps) {
  const query = `*[_type == "education"][0] {
    "title": coalesce(title[$lang], title.ru),
    "description": coalesce(description[$lang], description.ru),
    image
  }`
  
  const currentLang = lang || 'ru'
  const edu = await client.fetch(query, { lang: currentLang }, { next: { revalidate: 60 } })

  if (!edu) return null

  const safeTitle = edu.title || dict?.education_title || 'Обучение кондитерскому искусству'
  const safeDesc = edu.description || dict?.education_desc || ''

  return (
    <section id="education" className="relative px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <article className="group flex flex-col items-center gap-8 md:flex-row md:gap-16">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] md:w-1/2">
                <Image
                  src={edu.image ? urlFor(edu.image).url() : '/placeholder.svg'}
                  alt={safeTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex w-full flex-col items-start md:w-1/2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {dict?.education_tag || 'ОБУЧЕНИЕ'}
                </span>
                <h3 className="mt-4 font-serif text-3xl font-light text-foreground md:text-4xl">{safeTitle}</h3>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                  {safeDesc}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}