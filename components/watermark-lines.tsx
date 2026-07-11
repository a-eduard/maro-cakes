'use client'

export function WatermarkLines() {
  return (
    // absolute left-0 right-0 top-0 bottom-0: Жестко растягивает контейнер от самого верха до самого низа документа
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-[-50] overflow-hidden opacity-40">
      
      {/* 1. ВЕРХНИЙ (Всегда прибит к шапке) */}
      <div 
        className="absolute left-[-10%] top-0 h-[800px] w-[120%] bg-[#8E6BBF] mix-blend-multiply md:h-[1200px]"
        style={{
          WebkitMaskImage: 'url(/vectors/lil-vector.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'top left',
          maskImage: 'url(/vectors/lil-vector.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'top left',
        }}
      />

      {/* 2. ЦЕНТРАЛЬНЫЙ 1 (Распределяется по первой трети страницы) */}
      <div 
        className="absolute right-[-10%] top-[30%] h-[1000px] w-[120%] bg-[#1F6F5B] mix-blend-multiply md:h-[1400px]"
        style={{
          WebkitMaskImage: 'url(/vectors/green-vector.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center right',
          maskImage: 'url(/vectors/green-vector.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center right',
        }}
      />

      {/* 3. ЦЕНТРАЛЬНЫЙ 2 (Распределяется по второй трети страницы) */}
      <div 
        className="absolute left-[-10%] top-[65%] h-[1000px] w-[120%] bg-[#8E6BBF] mix-blend-multiply md:h-[1400px]"
        style={{
          WebkitMaskImage: 'url(/vectors/lil-vector.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center left',
          maskImage: 'url(/vectors/lil-vector.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center left',
        }}
      />

      {/* 4. НИЖНИЙ (Всегда прибит к подвалу и блоку Обучения) */}
      <div 
        className="absolute right-[-10%] bottom-0 h-[800px] w-[120%] bg-[#FF6C3A] mix-blend-multiply md:h-[1200px]"
        style={{
          WebkitMaskImage: 'url(/vectors/yellow-vector.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'bottom right',
          maskImage: 'url(/vectors/yellow-vector.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'bottom right',
        }}
      />

    </div>
  )
}