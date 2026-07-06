import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maro-cakes.vercel.app' // Поменяем на боевой домен перед релизом
  const locales = ['ka', 'ru', 'en', 'uk']
  
  // Наши основные страницы
  const routes = ['', '/gallery', '/prices', '/privacy']

  // Генерируем URL для каждого языка и каждой страницы
  const sitemapEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8, // Главной странице даем приоритет 1.0, остальным 0.8
    }))
  )

  return sitemapEntries
}