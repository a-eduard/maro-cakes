import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { getDictionary } from '@/lib/dictionaries'

// Типизация для статьи
interface BlogPost {
  title: string
  mainImage?: any
  image?: any
  publishedAt: string
  body: any
  excerpt?: string
}

// Добавляем lang в параметры
type Props = {
  params: Promise<{ lang: string; slug: string }>
}

// 1. Динамическая генерация SEO-метатегов для Google
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const { lang, slug } = resolvedParams

  // ИСПРАВЛЕНИЕ 1: Извлекаем строку для текущего языка через coalesce
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "title": coalesce(title[$lang], title.ru),
    "excerpt": coalesce(excerpt[$lang], excerpt.ru)
  }`
  
  // Передаем переменную lang в запрос
  const post = await client.fetch(query, { slug, lang }, { next: { revalidate: 60 } })

  if (!post) {
    return { title: 'Статья не найдена | MarO Батуми' }
  }

  return {
    title: `${post.title} | Блог MarO Батуми`,
    description: post.excerpt || `Читайте полезную статью "${post.title}" в блоге кондитерской студии MarO.`,
  }
}

// 2. Рендер страницы
export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params
  const { lang, slug } = resolvedParams

  const dict = await getDictionary(lang as any)

  // ИСПРАВЛЕНИЕ 2: Извлекаем мультиязычные поля title, excerpt и body
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "title": coalesce(title[$lang], title.ru),
    "excerpt": coalesce(excerpt[$lang], excerpt.ru),
    "body": coalesce(body[$lang], body.ru),
    mainImage,
    image,
    publishedAt
  }`
  
  // Передаем переменную lang в запрос
  const post: BlogPost = await client.fetch(query, { slug, lang }, { next: { revalidate: 60 } })

  if (!post) {
    notFound()
  }

  const postCover = post.mainImage || post.image

  const getLocaleForDate = (locale: string) => {
    switch (locale) {
      case 'en': return 'en-US'
      case 'uk': return 'uk-UA'
      case 'ka': return 'ka-GE'
      default: return 'ru-RU'
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader dict={dict.header} />

      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <article className="px-6 md:px-12">
          <div className="mx-auto max-w-3xl">
            
            <Reveal className="mb-12 text-center md:mb-16">
              <time className="mb-6 block text-sm tracking-widest text-muted-foreground uppercase">
                {new Date(post.publishedAt).toLocaleDateString(getLocaleForDate(lang), {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
              <h1 className="text-balance font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
                {post.title}
              </h1>
            </Reveal>

            {postCover && (
              <Reveal delay={0.2} className="relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-border/50 shadow-sm md:mb-24">
                <Image
                  src={urlFor(postCover).url()}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </Reveal>
            )}

            <Reveal delay={0.3} className="mx-auto max-w-2xl">
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground [&>h2]:pt-10 [&>h2]:font-serif [&>h2]:text-3xl [&>h2]:text-foreground [&>h3]:pt-8 [&>h3]:font-serif [&>h3]:text-2xl [&>h3]:text-foreground [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-400 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-foreground/80">
                {post.body ? (
                  <PortableText value={post.body} />
                ) : (
                  <p>Контент статьи пока не добавлен.</p>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.4} className="mt-20 border-t border-border/60 pt-10 text-center">
              <Link
                href={`/${lang}/blog`}
                // Заменили ключ словаря и добавили hover-эффект с розовой подсветкой #FF9FB2
                className="inline-flex h-14 items-center justify-center rounded-full border border-border/80 bg-background px-10 text-sm font-medium tracking-wide text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#FF9FB2]/60 hover:bg-transparent hover:text-[#FF9FB2] hover:shadow-xl hover:shadow-[#FF9FB2]/20 active:scale-95"
              >
                {dict.ui?.back_to_blog || 'Вернуться в блог'}
              </Link>
            </Reveal>

          </div>
        </article>
      </main>

      <SiteFooter lang={lang} dict={dict.ui} />
    </div>
  )
}