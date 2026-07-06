import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Поддерживаемые языки
const locales = ['ka', 'ru', 'en', 'uk']
const defaultLocale = 'ka' // Грузинский теперь базовый язык

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Пропускаем системные пути, изображения, API и админку Sanity
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') || // Исключаем маршрут Sanity Studio
    pathname.includes('.') // Файлы с расширением (favicon.ico, logo.png)
  ) {
    return NextResponse.next()
  }

  // Проверяем, есть ли уже локаль в URL
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Если локали в URL нет, перенаправляем на дефолтную
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Применяем middleware ко всем путям, кроме системных
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}