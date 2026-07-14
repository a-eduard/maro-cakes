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

  // Увеличили ширину до 140vw (было 100vw) и высоту до 1200px, 
  // а также сдвинули вправо на -15vw, чтобы края уходили за экран
  const baseClasses = "pointer-events-none absolute w-[200vw] h-[800px] md:w-[140vw] md:h-[1200px] opacity-10 right-[-20vw] md:right-[-15vw] [mask-position:right_center] [-webkit-mask-position:right_center]"

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
      <div className={`${baseClasses} bg-[#1F6F5B] top-[10vh]`} style={maskStyle} />
      <div className={`${baseClasses} bg-[#8E6BBF] top-[28%]`} style={maskStyle} />
      <div className={`${baseClasses} bg-[#F3D35A] top-[48%]`} style={maskStyle} />
      <div className={`${baseClasses} bg-[#FF6C3A] top-[68%]`} style={maskStyle} />
      <div className={`${baseClasses} bg-[#FF9FB2] top-[88%]`} style={maskStyle} />
    </div>
  )
}