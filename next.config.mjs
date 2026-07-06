/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Включаем поддержку супер-современных форматов (AVIF весит меньше WebP)
    formats: ['image/avif', 'image/webp'],
    // Разрешаем Next.js оптимизировать картинки, приходящие из базы Sanity
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Кэшируем оптимизированные картинки надолго (ускорит повторные загрузки)
    minimumCacheTTL: 31536000,
  },
}

export default nextConfig