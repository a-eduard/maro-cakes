'use client'

import { usePathname } from 'next/navigation'

export function WatermarkLines() {
  const pathname = usePathname() || ''
  
  const isHomePage = pathname === '/' || /^\/[a-z]{2}$/.test(pathname)

  const maskStyle = {
    WebkitMaskImage: "url('/vectors/vector-main.svg')",
    maskImage: "url('/vectors/vector-main.svg')",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }

  const baseClasses = "pointer-events-none absolute w-[150vw] h-[600px] md:w-[110vw] md:h-[900px] opacity-10"

  if (!isHomePage) {
    let colorClass = 'bg-[#1F6F5B]' 
    let positionClass = 'fixed -left-[10vw] top-[15vh] [mask-position:center] [-webkit-mask-position:center] -z-50'

    if (pathname.includes('/gallery')) {
      colorClass = 'bg-[#8E6BBF]' 
    } else if (pathname.includes('/about') || pathname.includes('/reviews')) {
      colorClass = 'bg-[#F3D35A]' 
    } else if (pathname.includes('/prices') || pathname.includes('/faq')) {
      colorClass = 'bg-[#FF6C3A]' 
    } else if (pathname.includes('/blog') || pathname.includes('/education')) {
      colorClass = 'bg-[#FF9FB2]' 
    }

    return (
      <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-white">
        <div 
          className={`${baseClasses} ${positionClass} ${colorClass}`} 
          style={maskStyle} 
        />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-50 overflow-hidden">
      
      {/* 1. Блок 1 (Начало/Герой) — Зеленый. Опустили вниз на 12vh */}
      <div 
        className={`${baseClasses} bg-[#1F6F5B] left-[-15vw] top-[12vh] [mask-position:left_top] [-webkit-mask-position:left_top]`} 
        style={maskStyle} 
      />

      {/* 2. Блок 2 (Галерея) — Фиолетовый */}
      <div 
        className={`${baseClasses} bg-[#8E6BBF] right-[-10vw] top-[22%] [mask-position:right_center] [-webkit-mask-position:right_center]`} 
        style={maskStyle} 
      />

      {/* 3. Блок 3 (О нас) — Желтый */}
      <div 
        className={`${baseClasses} bg-[#F3D35A] left-[-20vw] top-[42%] [mask-position:left_center] [-webkit-mask-position:left_center]`} 
        style={maskStyle} 
      />

      {/* 4. Блок 4 (Цены/Конструктор) — Оранжевый */}
      <div 
        className={`${baseClasses} bg-[#FF6C3A] right-[-10vw] top-[64%] [mask-position:right_center] [-webkit-mask-position:right_center]`} 
        style={maskStyle} 
      />

      {/* 5. Блок 5 (Обучение/Отзывы) — Розовый */}
      <div 
        className={`${baseClasses} bg-[#FF9FB2] left-[-15vw] top-[82%] [mask-position:left_bottom] [-webkit-mask-position:left_bottom]`} 
        style={maskStyle} 
      />

    </div>
  )
}