import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Блог о десертах | MarO Батуми',
  description: 'Статьи о кондитерском искусстве, выборе тортов, трендах в декоре и новостях нашей студии.',
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
}

export default async function BlogPage() {
  // Получаем список статей
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt
  }`
  const posts: BlogPost[] = await client.fetch(query)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1 pt-32 pb-24 md:pt-48 md:pb-40">
        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-16 md:mb-24">
              <h1 className="font-serif text-5xl font-light leading-tight text-foreground md:text-6xl">
                Наш блог
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Полезные статьи, тренды в дизайне тортов и секреты кондитерского мастерства.
              </p>
            </Reveal>

            {posts.length > 0 ? (
              <div className="flex flex-col gap-12">
                {posts.map((post, i) => (
                  <Reveal key={post._id} delay={i * 0.1}>
                    <article className="group border-b border-border/50 pb-12">
                      <time className="mb-4 block text-sm text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </time>
                      <Link href={`/blog/${post.slug?.current || ''}`}>
                        <h2 className="font-serif text-3xl font-medium text-foreground transition-colors group-hover:text-rose-400">
                          {post.title}
                        </h2>
                      </Link>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Статьи скоро появятся.</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}