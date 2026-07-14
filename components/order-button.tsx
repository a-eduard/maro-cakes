'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const OrderModal = dynamic(
  () => import('@/components/order-modal').then(mod => mod.OrderModal),
  { ssr: false }
)

interface OrderButtonProps {
  cake: {
    title: string
    price: number
    image: any
  }
  dict?: any
}

export function OrderButton({ cake, dict }: OrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const uiDict = dict?.ui || dict
  const orderText = dict?.header?.order || dict?.order || 'Заказать'

  return (
    <div className="mt-auto pt-6 w-full">
      <button
        onClick={() => setIsOpen(true)}
        // Добавлена обводка border-[#D6AD1C] и цвет текста под нее, чтобы кнопка сразу выделялась
        className="flex h-10 w-full items-center justify-center rounded-full border border-[#D6AD1C] bg-transparent text-sm font-medium tracking-wide text-[#3F372F] transition-all duration-300 hover:bg-[#F3D35F] hover:border-[#F3D35F] hover:shadow-sm active:scale-95"
      >
        {orderText}
      </button>
      
      {isOpen && (
        <OrderModal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          cake={cake} 
          dict={uiDict} 
        />
      )}
    </div>
  )
}