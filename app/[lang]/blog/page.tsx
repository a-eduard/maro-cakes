import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { getDictionary } from '@/lib/dictionaries'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
}

// Динамическая генерация метаданных для SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as any)
  
  return {
    title: `${dict.header?.blog || 'Блог'} | MarO`,
    description: dict.ui?.blog_desc || 'Статьи о кондитерском искусстве и новостях нашей студии.',
  }
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as any)

  // Получаем список статей с учетом языка (coalesce)
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    "title": coalesce(title[$lang], title.ru),
    slug,
    publishedAt
  }`
  const posts: BlogPost[] = await client.fetch(query, { lang }, { next: { revalidate: 60 } })

  // Функция для правильного формата даты по языку
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
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-16 md:mb-24">
              <h1 className="font-serif text-5xl font-light leading-tight text-foreground md:text-6xl">
                {dict.header?.blog || 'Наш блог'}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {dict.ui?.blog_subtitle || 'Полезные статьи, тренды в дизайне тортов и секреты кондитерского мастерства.'}
              </p>
            </Reveal>

            {posts.length > 0 ? (
              <div className="flex flex-col gap-12">
                {posts.map((post, i) => (
                  <Reveal key={post._id} delay={i * 0.1}>
                    <article className="group border-b border-border/50 pb-12">
                      <time className="mb-4 block text-sm text-muted-foreground capitalize">
                        {new Date(post.publishedAt).toLocaleDateString(getLocaleForDate(lang), {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </time>
                      <Link href={`/${lang}/blog/${post.slug?.current || ''}`}>
                        <h2 className="font-serif text-3xl font-medium text-foreground transition-colors group-hover:text-brand-400">
                          {post.title}
                        </h2>
                      </Link>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                {dict.ui?.bestsellers_empty || 'Статьи скоро появятся.'}
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} dict={dict.ui} />
    </div>
  )
}