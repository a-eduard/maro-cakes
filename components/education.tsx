import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Flourish } from '@/components/flourish'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface EducationProps {
  isDetailedView?: boolean
}

export async function Education({ isDetailedView = false }: EducationProps) {
  const query = `*[_type == "education"][0]`
  const edu = await client.fetch(query)

  if (!edu) return null

  return (
    <section id="education" className="relative px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-40">
      <Flourish className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-line/40" />

      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-2xl sm:mb-16 md:mb-24">
          <p className="mb-4 sm:mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Мастер-классы
          </p>
          <h2 className="text-balance font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl md:text-5xl">
            Делимся мастерством
          </h2>
        </Reveal>

        <div className="mx-auto max-w-5xl">
          <Reveal>
            <article className="group flex flex-col items-center gap-8 sm:gap-10 md:flex-row md:gap-16">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] md:w-1/2">
                <Image
                  src={edu.image ? urlFor(edu.image).url() : '/placeholder.svg'}
                  alt={edu.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex w-full flex-col pt-2 sm:pt-4 md:w-1/2 md:pt-0">
                <span className="text-xs tracking-[0.3em] text-accent">
                  ОБУЧЕНИЕ
                </span>
                <h3 className="mt-3 sm:mt-4 font-serif text-2xl sm:text-3xl font-light text-foreground md:text-4xl">
                  {edu.title}
                </h3>
                <p 
                  className={`mt-4 sm:mt-6 text-pretty leading-relaxed text-muted-foreground whitespace-pre-line ${
                    isDetailedView ? '' : 'line-clamp-4'
                  }`}
                >
                  {edu.description}
                </p>
                <div className="mt-8 sm:mt-10">
                  <a
                    href="#contacts"
                    className="inline-flex items-center gap-2 text-sm tracking-wide text-foreground transition-colors hover:text-brand-400"
                  >
                    Записаться
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        {!isDetailedView && (
          <Reveal delay={0.4} className="mt-12 flex justify-center sm:mt-16 md:mt-24">
            <Link
              href="/education"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm tracking-wide text-foreground transition-all hover:bg-foreground hover:text-background"
            >
              Подробнее об обучении
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}