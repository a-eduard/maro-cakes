import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://maro-cakes.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'], // Прячем админку и API от поисковиков
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}