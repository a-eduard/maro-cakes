'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2, Check } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

interface BuilderOption {
  name: string
  matchName?: string 
  priceModifier?: number
  price?: number
}

interface Combination {
  biscuitName: string
  fillingName: string
  image: any
}

interface CakeBuilderProps {
  data: {
    basePrice: number
    biscuits: BuilderOption[]
    fillings: BuilderOption[]
    decorations: BuilderOption[]
    combinations?: Combination[]
  }
  dict?: any
}

export function CakeBuilder({ data, dict }: CakeBuilderProps) {
  const [weight, setWeight] = useState<number>(2)
  const [biscuit, setBiscuit] = useState<BuilderOption | null>(null)
  const [filling, setFilling] = useState<BuilderOption | null>(null)
  const [decoration, setDecoration] = useState<BuilderOption | null>(null)
  const [wishes, setWishes] = useState<string>('')
  
  const [deliveryDate, setDeliveryDate] = useState<string>('')
  const [deliveryAddress, setDeliveryAddress] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const calculateTotal = () => {
    let perKg = data.basePrice
    if (biscuit?.priceModifier) perKg += biscuit.priceModifier
    if (filling?.priceModifier) perKg += filling.priceModifier
    
    let total = perKg * weight
    if (decoration?.price) total += decoration.price

    return total
  }

  const today = new Date().toISOString().split('T')[0]

  const handleOrder = async () => {
    if (!biscuit || !filling) {
      alert(dict?.alert_biscuit_filling || 'Пожалуйста, выберите бисквит и начинку перед заказом.')
      return
    }
    if (!deliveryDate) {
      alert(dict?.alert_date || 'Пожалуйста, укажите дату, на которую нужен торт.')
      return
    }
    if (!phone.trim()) {
      alert(dict?.alert_phone || 'Пожалуйста, укажите ваш номер телефона или логин в Telegram.')
      return
    }

    setIsSubmitting(true)
    const total = calculateTotal()
    
    const text = `🎂 *Новый заказ из конструктора!*\n\n` +
      `📞 *Связь:* ${phone}\n` +
      `📅 *Дата:* ${deliveryDate}\n` +
      `📍 *Адрес:* ${deliveryAddress || 'Самовывоз / Не указан'}\n` +
      `⚖️ *Вес:* ${weight} кг\n` +
      `🍰 *Бисквит:* ${biscuit?.name}\n` +
      `🍓 *Начинка:* ${filling?.name}\n` +
      `✨ *Декор:* ${decoration?.name || 'Без декора'}\n` +
      `📝 *Пожелания:* ${wishes || 'Нет'}\n\n` +
      `💰 *Примерная стоимость:* ${total} ₾`

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        alert(dict?.alert_error || 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.')
      }
    } catch (error) {
      alert(dict?.alert_network || 'Ошибка сети. Пожалуйста, проверьте подключение и попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentCombo = data.combinations?.find(
    (combo) => 
      combo.biscuitName === biscuit?.matchName && 
      combo.fillingName === filling?.matchName
  )

  const fallbackImage = data.combinations?.[0]?.image ? urlFor(data.combinations[0].image).url() : '/placeholder.svg'
  const displayImageUrl = currentCombo?.image ? urlFor(currentCombo.image).url() : fallbackImage

  // Максимально компактные кнопки для телефона (px-2 py-2 на мобилках)
  const optionButtonClass = (isActive: boolean) => 
    `rounded-xl border px-2 py-2 sm:px-3 sm:py-2 text-left transition-all duration-300 active:scale-95 flex flex-col justify-center ${
      isActive
        ? 'border-[#D4B76A] bg-[#D4B76A]/10 text-[#D4B76A] shadow-sm scale-[1.02]'
        : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/30 hover:text-white hover:scale-[1.02]'
    }`

  const inputClass = "w-full rounded-xl border border-white/10 bg-zinc-900/50 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-[#D4B76A] focus:bg-zinc-900"

  return (
    // Убираем лишние margin на мобилках, чтобы использовать 100% ширины
    <div className="mx-0 sm:mx-auto max-w-5xl rounded-[1.25rem] sm:rounded-[2rem] bg-zinc-950 p-4 sm:p-6 md:p-8 text-left shadow-2xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Левая колонка */}
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="mb-2 font-serif text-base sm:text-lg text-white">{dict?.builder_step_1 || '1. Вес торта (кг)'}</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 1.5, 2, 2.5, 3, 4, 5].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`rounded-lg px-3 py-1 text-xs sm:text-sm font-medium transition-all duration-300 active:scale-95 ${
                    weight === w
                      ? 'bg-[#D4B76A] text-zinc-950 scale-105 shadow-sm shadow-[#D4B76A]/20'
                      : 'bg-zinc-900/50 text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white hover:scale-105'
                  }`}
                >
                  {w} {dict?.builder_kg || 'кг'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-serif text-base sm:text-lg text-white">{dict?.builder_step_2 || '2. Бисквит'}</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {data.biscuits?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setBiscuit(item)}
                  className={optionButtonClass(biscuit?.name === item.name)}
                >
                  <span className={`block font-semibold mb-0.5 text-[11px] sm:text-xs leading-tight ${biscuit?.name === item.name ? 'text-[#D4B76A]' : 'text-white'}`}>{item.name}</span>
                  {item.priceModifier ? (
                    <span className="text-[9px] sm:text-[10px] opacity-70">+{item.priceModifier} ₾/{dict?.builder_kg || 'кг'}</span>
                  ) : (
                    <span className="text-[9px] sm:text-[10px] opacity-70">{dict?.builder_included || 'Входит в цену'}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-serif text-base sm:text-lg text-white">{dict?.builder_step_3 || '3. Начинка'}</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {data.fillings?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setFilling(item)}
                  className={optionButtonClass(filling?.name === item.name)}
                >
                  <span className={`block font-semibold mb-0.5 text-[11px] sm:text-xs leading-tight ${filling?.name === item.name ? 'text-[#D4B76A]' : 'text-white'}`}>{item.name}</span>
                  {item.priceModifier ? (
                    <span className="text-[9px] sm:text-[10px] opacity-70">+{item.priceModifier} ₾/{dict?.builder_kg || 'кг'}</span>
                  ) : (
                    <span className="text-[9px] sm:text-[10px] opacity-70">{dict?.builder_included || 'Входит в цену'}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-serif text-base sm:text-lg text-white">{dict?.builder_step_4 || '4. Декор'}</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {data.decorations?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setDecoration(item)}
                  className={optionButtonClass(decoration?.name === item.name)}
                >
                  <span className={`block font-semibold mb-0.5 text-[11px] sm:text-xs leading-tight ${decoration?.name === item.name ? 'text-[#D4B76A]' : 'text-white'}`}>{item.name}</span>
                  <span className="text-[9px] sm:text-[10px] opacity-70">+{item.price} ₾ ({dict?.builder_fixed || 'фикс.'})</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-serif text-base sm:text-lg text-white">{dict?.builder_step_5 || '5. Пожелания'}</h3>
            <textarea
              rows={2}
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              placeholder={dict?.builder_wishes_placeholder || "Например: Без орехов."}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Правая колонка */}
        <div className="flex h-full flex-col">
          <div className="sticky top-20 flex flex-col items-center rounded-2xl bg-zinc-900/40 p-4 sm:p-6 border border-white/5">
            {/* Картинка торта - крошечная на мобильных (100px), чтобы экономить место */}
            <div className="relative mb-4 aspect-square w-full max-w-[100px] sm:max-w-[140px] overflow-hidden rounded-full shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayImageUrl}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={displayImageUrl}
                    alt="Cake"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="w-full">
              <h4 className="mb-2 font-serif text-base sm:text-lg text-white">{dict?.builder_your_order || 'Ваш заказ:'}</h4>
              <ul className="mb-4 flex flex-col gap-1.5 text-[11px] sm:text-xs text-zinc-400">
                <li className="flex justify-between items-center border-b border-white/5 pb-1.5">
                  <span>{dict?.builder_weight || 'Вес:'}</span> <span className="font-medium text-white">{weight} {dict?.builder_kg || 'кг'}</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-1.5">
                  <span>{dict?.builder_biscuit || 'Бисквит:'}</span> <span className="font-medium text-white text-right max-w-[65%] truncate">{biscuit?.name || dict?.builder_not_selected || 'Не выбран'}</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-1.5">
                  <span>{dict?.builder_filling || 'Начинка:'}</span> <span className="font-medium text-white text-right max-w-[65%] truncate">{filling?.name || dict?.builder_not_selected || 'Не выбрана'}</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-1.5">
                  <span>{dict?.builder_decoration || 'Декор:'}</span> <span className="font-medium text-white text-right max-w-[65%] truncate">{decoration?.name || dict?.builder_no_decoration || 'Без декора'}</span>
                </li>
              </ul>
              
              <div className="mb-4 flex items-end justify-between text-white">
                <span className="font-serif text-base sm:text-lg">{dict?.builder_total || 'Итого:'}</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#D4B76A] font-bold">
                  {calculateTotal()} ₾
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-zinc-500 pointer-events-none">
                    {dict?.builder_date || 'Дата:'}
                  </span>
                  <input
                    type="text"
                    lang="en"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text'
                    }}
                    placeholder={dict?.builder_date_format || 'DD.MM'}
                    min={today}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className={`${inputClass} pl-[3.2rem] sm:pl-[4rem]`}
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
                
                <button
                  onClick={handleOrder}
                  disabled={isSuccess || isSubmitting}
                  className={`mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide text-zinc-950 shadow-md transition-all duration-300 ${
                    isSuccess 
                      ? 'bg-emerald-500 shadow-emerald-500/30' 
                      : 'bg-[#D4B76A] shadow-[#D4B76A]/20 hover:scale-[1.02] active:scale-95'
                  } disabled:cursor-not-allowed disabled:opacity-90 disabled:hover:scale-100 disabled:active:scale-100`}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-zinc-950" />
                  ) : isSuccess ? (
                    <>
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-950" />
                      {dict?.builder_success || 'Заявка отправлена'}
                    </>
                  ) : (
                    dict?.builder_order_btn || 'Заказать'
                  )}
                </button>
              </div>
              
              {isSuccess && (
                <p className="mt-2 text-center text-[10px] sm:text-xs text-emerald-400 font-medium">
                  {dict?.builder_success_desc || 'Свяжемся с вами в ближайшее время.'}
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}