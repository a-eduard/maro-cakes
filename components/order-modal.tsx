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
  // Добавляем состояние для веса (по умолчанию 2 кг)
  const [weight, setWeight] = useState<number>(2)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [wishes, setWishes] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  
  // Динамический расчет итоговой стоимости
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
          setWeight(2) // Сбрасываем вес при закрытии
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

  const inputClass = "w-full rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-[#D4B76A] focus:bg-zinc-900"

  return (
    <AnimatePresence>
      {isOpen && cake && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[2010] w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] bg-zinc-950 shadow-2xl border border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-zinc-900/50 p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
              {/* Шапка модалки с изображением и динамической ценой */}
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/5 shadow-md">
                    <Image
                      src={cake.image ? urlFor(cake.image).url() : '/placeholder.svg'}
                      alt={cake.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-light text-white leading-tight pr-4">{cake.title}</h3>
                    <p className="mt-1 text-xs text-zinc-400">{cake.price} ₾ / {dict?.builder_kg || 'кг'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 mb-1">{dict?.builder_total || 'Итого:'}</p>
                  <p className="font-serif text-2xl font-bold text-[#D4B76A]">{totalPrice} ₾</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* Выбор веса */}
                <div>
                  <h4 className="mb-2 text-sm font-medium text-white">{dict?.builder_step_1 || '1. Вес торта (кг)'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {[1, 1.5, 2, 2.5, 3, 4, 5].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWeight(w)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 active:scale-95 ${
                          weight === w
                            ? 'bg-[#D4B76A] text-zinc-950 shadow-sm shadow-[#D4B76A]/20'
                            : 'bg-zinc-900/50 text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {w} {dict?.builder_kg || 'кг'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Форма контактов */}
                <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500 pointer-events-none">
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
                  className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-wide text-zinc-950 shadow-md transition-all duration-300 ${
                    isSuccess 
                      ? 'bg-emerald-500 shadow-emerald-500/30' 
                      : 'bg-[#D4B76A] shadow-[#D4B76A]/20 hover:scale-[1.02] active:scale-95'
                  } disabled:cursor-not-allowed disabled:opacity-90 disabled:hover:scale-100 disabled:active:scale-100`}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-950" />
                  ) : isSuccess ? (
                    <>
                      <Check className="h-5 w-5 text-zinc-950" />
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