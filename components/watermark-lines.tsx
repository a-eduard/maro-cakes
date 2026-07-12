'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function WatermarkLines() {
  const pathname = usePathname() || ''
  
  // Проверяем, находимся ли мы на главной странице
  const isHomePage = pathname === '/' || /^\/[a-z]{2}$/.test(pathname)

  // Настройка для коротких страниц (по умолчанию Фиолетовый)
  let vectorSrc = '/vectors/lil-vector.png'
  let positionClass = 'fixed -left-[15vw] -top-[5vh] h-[60vh] w-[90vw] md:-left-[5vw] md:w-[60vw] -z-50'
  let alignClass = 'object-contain object-top'

  if (!isHomePage) {
    if (pathname.includes('/blog') || pathname.includes('/reviews')) {
      vectorSrc = '/vectors/lil-vector.png' 
      alignClass = 'object-contain object-top'
    } else if (pathname.includes('/faq') || pathname.includes('/prices')) {
      vectorSrc = '/vectors/green-vector.png' 
      positionClass = 'fixed -right-[15vw] top-[15vh] h-[60vh] w-[90vw] md:-right-[5vw] md:w-[60vw] -z-50'
      alignClass = 'object-contain object-right'
    } else {
      vectorSrc = '/vectors/yellow-vector.png' 
      positionClass = 'fixed -left-[10vw] bottom-[10vh] h-[60vh] w-[90vw] md:-left-[5vw] md:w-[60vw] -z-50'
      alignClass = 'object-contain object-bottom'
    }
  }

  return (
    <>
      {isHomePage ? (
        // ==========================================
        // ГЛАВНАЯ СТРАНИЦА: Абсолютное позиционирование по контенту
        // ==========================================
        <div className="pointer-events-none absolute inset-0 -z-50 overflow-hidden">
          <div className="absolute inset-0 opacity-90 mix-blend-multiply">
            
            {/* 1. ЗЕЛЕНЫЙ: Блок Галерея (Справа) */}
            <div className="absolute right-[-10vw] top-[2%] h-[800px] w-[120vw] md:h-[1400px] md:w-[100vw]">
              <Image 
                src="/vectors/green-vector.png" 
                alt="Green Pattern" 
                fill 
                className="object-contain object-right-top" 
                priority 
              />
            </div>

            {/* 2. ФИОЛЕТОВЫЙ: О нас и Цены (Слева) */}
            <div className="absolute left-[-15vw] top-[35%] h-[800px] w-[120vw] md:h-[1400px] md:w-[100vw]">
              <Image 
                src="/vectors/lil-vector.png" 
                alt="Lilac Pattern" 
                fill 
                className="object-contain object-left" 
              />
            </div>

            {/* 3. ЖЕЛТЫЙ: Обучение и Подвал (Справа) */}
            <div className="absolute right-[-10vw] bottom-[1%] h-[800px] w-[120vw] md:h-[1400px] md:w-[100vw]">
              <Image 
                src="/vectors/yellow-vector.png" 
                alt="Yellow Pattern" 
                fill 
                className="object-contain object-right-bottom" 
              />
            </div>

          </div>
        </div>
      ) : (
        // ==========================================
        // КОРОТКИЕ СТРАНИЦЫ: 1 фиксированный вектор
        // ==========================================
        <div className="pointer-events-none opacity-90 mix-blend-multiply">
          <div className={positionClass}>
            <Image src={vectorSrc} alt="Background Pattern" fill className={alignClass} priority />
          </div>
        </div>
      )}
    </>
  )
}