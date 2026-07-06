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

// Добавляем lang в параметры, так как мы находимся в папке [lang]
type Props = {
  params: Promise<{ lang: string; slug: string }>
}

// 1. Динамическая генерация SEO-метатегов для Google
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  const query = `*[_type == "post" && slug.current == $slug][0]`
  const post = await client.fetch(query, { slug }, { next: { revalidate: 60 } })

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

  // Подтягиваем нужный словарь для текущего языка
  const dict = await getDictionary(lang as any)

  // Получаем конкретную статью по слагу (slug) из URL
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    image,
    publishedAt,
    body,
    excerpt
  }`
  
  const post: BlogPost = await client.fetch(query, { slug }, { next: { revalidate: 60 } })

  // Если статья не найдена в базе, Next.js автоматически отдаст красивую страницу 404
  if (!post) {
    notFound()
  }

  // Sanity может сохранять обложку как mainImage или image в зависимости от настроек шаблона
  const postCover = post.mainImage || post.image

  // Простая функция для форматирования даты в зависимости от языка
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
      {/* Передаем dict в шапку */}
      <SiteHeader dict={dict.header} />

      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <article className="px-6 md:px-12">
          <div className="mx-auto max-w-3xl">
            
            {/* Шапка статьи */}
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

            {/* Обложка статьи */}
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

            {/* Текст статьи (PortableText от Sanity) */}
            <Reveal delay={0.3} className="mx-auto max-w-2xl">
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground [&>h2]:pt-10 [&>h2]:font-serif [&>h2]:text-3xl [&>h2]:text-foreground [&>h3]:pt-8 [&>h3]:font-serif [&>h3]:text-2xl [&>h3]:text-foreground [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-400 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-foreground/80">
                {post.body ? (
                  <PortableText value={post.body} />
                ) : (
                  <p>Контент статьи пока не добавлен.</p>
                )}
              </div>
            </Reveal>

            {/* Кнопка "Назад в блог" */}
            <Reveal delay={0.4} className="mt-20 border-t border-border/60 pt-10 text-center">
              <Link
                href={`/${lang}/blog`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-transparent px-8 text-sm tracking-wide text-foreground transition-all hover:border-brand-400 hover:text-brand-500"
              >
                {dict.ui?.bestsellers_btn || 'Вернуться к списку статей'}
              </Link>
            </Reveal>

          </div>
        </article>
      </main>

      {/* Передаем lang и dict в подвал */}
      <SiteFooter lang={lang} dict={dict.ui} />
    </div>
  )
}