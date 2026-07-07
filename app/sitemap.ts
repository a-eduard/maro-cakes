import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://maro-cakes.vercel.app' // Поменяем на боевой домен перед релизом
  const locales = ['ka', 'ru', 'en', 'uk']
  
  // 1. Все основные статические страницы
  const routes = ['', '/gallery', '/prices', '/privacy', '/blog', '/faq', '/reviews', '/education']

  const staticEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  // 2. Динамические страницы блога из Sanity
  // Запрашиваем только slug и дату обновления для экономии ресурсов
  const postsQuery = `*[_type == "post"] { 
    slug, 
    _updatedAt 
  }`
  const posts = await client.fetch(postsQuery)

  const dynamicEntries = locales.flatMap((locale) =>
    posts.map((post: any) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6, // Статьям обычно дают приоритет чуть ниже основных страниц
    }))
  )

  return [...staticEntries, ...dynamicEntries]
}