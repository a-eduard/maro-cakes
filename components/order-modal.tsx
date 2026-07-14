'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, Loader2, Check } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  cake: {
    title: string
    price: number
    image: any
  } | null
  dict?: any
}

export function OrderModal({ isOpen, onClose, cake, dict }: OrderModalProps) {
  const [weight, setWeight] = useState<number>(2)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [wishes, setWishes] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  
  const totalPrice = cake ? cake.price * weight : 0

  const handleOrder = async () => {
    if (!deliveryDate) {
      alert(dict?.alert_date || 'Пожалуйста, укажите дату.')
      return
    }
    if (!phone.trim()) {
      alert(dict?.alert_phone || 'Пожалуйста, укажите ваш номер телефона.')
      return
    }

    setIsSubmitting(true)
    
    const text = `🛍 *Заказ готового торта!*\n\n` +
      `🍰 *Товар:* ${cake?.title}\n` +
      `⚖️ *Вес:* ${weight} кг\n` +
      `💰 *Итоговая цена:* ${totalPrice} ₾\n\n` +
      `📞 *Связь:* ${phone}\n` +
      `📅 *Дата:* ${deliveryDate}\n` +
      `📍 *Адрес:* ${deliveryAddress || 'Самовывоз'}\n` +
      `📝 *Пожелания:*\n${wishes || 'Нет'}`

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          setDeliveryDate('')
          setDeliveryAddress('')
          setPhone('')
          setWishes('')
          setWeight(2) 
        }, 3000)
      } else {
        alert(dict?.alert_error || 'Ошибка при отправке.')
      }
    } catch (error) {
      alert(dict?.alert_network || 'Ошибка сети.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = "w-full rounded-xl border border-[#D6AD1C]/50 bg-white px-4 py-2.5 text-sm text-[#3F372F] outline-none transition-all placeholder:text-[#3F372F]/40 focus:border-[#D6AD1C] focus:bg-white"

  return (
    <AnimatePresence>
      {isOpen && cake && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[2010] w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] bg-[#FFF8E1] shadow-2xl border border-[#D6AD1C]/30"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/5 p-2 text-[#3F372F]/60 transition-colors hover:bg-black/10 hover:text-[#3F372F]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
              <div className="mb-6 flex items-center justify-between border-b border-[#3F372F]/10 pb-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white shadow-sm">
                    <Image
                      src={cake.image ? urlFor(cake.image).url() : '/placeholder.svg'}
                      alt={cake.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#3F372F] leading-tight pr-4">{cake.title}</h3>
                    <p className="mt-1 text-xs text-[#3F372F]/70">{cake.price} ₾ / {dict?.builder_kg || 'кг'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#3F372F]/60 mb-1">{dict?.builder_total || 'Итого:'}</p>
                  <p className="font-serif text-2xl font-bold text-[#3F372F]">{totalPrice} ₾</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-[#3F372F]">{dict?.builder_step_1 || '1. Вес торта (кг)'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {[1, 1.5, 2, 2.5, 3, 4, 5].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWeight(w)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 active:scale-95 border ${
                          weight === w
                            ? 'bg-[#F3D35F] border-[#D6AD1C] text-[#3F372F] shadow-sm'
                            : 'bg-white border-[#D6AD1C]/30 text-[#3F372F]/70 hover:border-[#D6AD1C] hover:text-[#3F372F]'
                        }`}
                      >
                        {w} {dict?.builder_kg || 'кг'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#3F372F]/10 pt-5">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#3F372F]/50 pointer-events-none">
                      {dict?.builder_date || 'Дата:'}
                    </span>
                    <input
                      type="text"
                      lang="en"
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = 'text'
                      }}
                      min={today}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className={`${inputClass} pl-[3.5rem]`}
                      disabled={isSuccess || isSubmitting}
                    />
                  </div>

                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder={dict?.builder_address || 'Адрес доставки (или самовывоз)'}
                    className={inputClass}
                    disabled={isSuccess || isSubmitting}
                  />
                  
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={dict?.builder_phone || 'WhatsApp / Telegram'}
                    className={inputClass}
                    disabled={isSuccess || isSubmitting}
                  />

                  <textarea
                    rows={2}
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    placeholder={dict?.builder_wishes_placeholder || 'Пожелания: надпись, аллергии...'}
                    className={`${inputClass} resize-none`}
                    disabled={isSuccess || isSubmitting}
                  />
                </div>
                
                <button
                  onClick={handleOrder}
                  disabled={isSuccess || isSubmitting}
                  className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-wide text-[#3F372F] border shadow-md transition-all duration-300 ${
                    isSuccess 
                      ? 'bg-emerald-500 border-emerald-600 shadow-emerald-500/30' 
                      : 'bg-[#F3D35F] border-[#D6AD1C] shadow-[#D6AD1C]/20 hover:scale-[1.02] active:scale-95'
                  } disabled:cursor-not-allowed disabled:opacity-90 disabled:hover:scale-100 disabled:active:scale-100`}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin text-[#3F372F]" />
                  ) : isSuccess ? (
                    <>
                      <Check className="h-5 w-5 text-[#3F372F]" />
                      {dict?.builder_success || 'Заявка отправлена'}
                    </>
                  ) : (
                    dict?.checkout || 'Оформить заказ'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}