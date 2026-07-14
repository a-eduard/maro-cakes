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

  // Единый класс для всех векторов: одинаковый размер, прозрачность и выравнивание маски по левому краю
  const baseClasses = "pointer-events-none absolute w-[150vw] h-[600px] md:w-[100vw] md:h-[900px] opacity-10 left-[-10vw] [mask-position:left_center] [-webkit-mask-position:left_center]"

  if (!isHomePage) {
    let colorClass = 'bg-[#1F6F5B]' 
    let positionClass = 'fixed top-[15vh] -z-50'

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
        <div className={`${baseClasses} ${positionClass} ${colorClass}`} style={maskStyle} />
      </div>
    )
  }

  // ==========================================
  // ГЛАВНАЯ СТРАНИЦА: Абсолютно одинаковые векторы
  // ==========================================
  return (
    <div className="pointer-events-none absolute inset-0 -z-50 overflow-hidden">
      
      {/* БЛОК 1 (Зеленый) */}
      <div 
        className={`${baseClasses} bg-[#1F6F5B] top-[12vh]`} 
        style={maskStyle} 
      />

      {/* БЛОК 2 (Фиолетовый) */}
      <div 
        className={`${baseClasses} bg-[#8E6BBF] top-[28%]`} 
        style={maskStyle} 
      />

      {/* БЛОК 3 (Желтый) */}
      <div 
        className={`${baseClasses} bg-[#F3D35A] top-[48%]`} 
        style={maskStyle} 
      />

      {/* БЛОК 4 (Оранжевый) */}
      <div 
        className={`${baseClasses} bg-[#FF6C3A] top-[68%]`} 
        style={maskStyle} 
      />

      {/* БЛОК 5 (Розовый) */}
      <div 
        className={`${baseClasses} bg-[#FF9FB2] top-[88%]`} 
        style={maskStyle} 
      />

    </div>
  )
}