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

  // Изменили позиционирование: теперь вектор строго прижат вправо (right-0)
  const baseClasses = "pointer-events-none absolute w-[150vw] h-[600px] md:w-[100vw] md:h-[900px] opacity-10 right-0 [mask-position:right_center] [-webkit-mask-position:right_center]"

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

  return (
    <div className="pointer-events-none absolute inset-0 -z-50 overflow-hidden">
      <div className={`${baseClasses} bg-[#1F6F5B] top-[12vh]`} style={maskStyle} />
      <div className={`${baseClasses} bg-[#8E6BBF] top-[28%]`} style={maskStyle} />
      <div className={`${baseClasses} bg-[#F3D35A] top-[48%]`} style={maskStyle} />
      <div className={`${baseClasses} bg-[#FF6C3A] top-[68%]`} style={maskStyle} />
      <div className={`${baseClasses} bg-[#FF9FB2] top-[88%]`} style={maskStyle} />
    </div>
  )
}