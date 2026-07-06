'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2, Check } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

interface BuilderOption {
  name: string
  matchName?: string // Добавлен оригинальный ключ
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

  // ИСПРАВЛЕНИЕ: Ищем совпадение по скрытому оригинальному ключу matchName
  const currentCombo = data.combinations?.find(
    (combo) => 
      combo.biscuitName === biscuit?.matchName && 
      combo.fillingName === filling?.matchName
  )

  const fallbackImage = data.combinations?.[0]?.image ? urlFor(data.combinations[0].image).url() : '/placeholder.svg'
  const displayImageUrl = currentCombo?.image ? urlFor(currentCombo.image).url() : fallbackImage

  return (
    <div className="rounded-[1.5rem] border border-border/60 bg-accent/5 p-4 sm:rounded-[2rem] sm:p-8 md:p-12 text-left">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        
        {/* Левая колонка */}
        <div className="flex flex-col gap-8 sm:gap-10">
          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">{dict?.builder_step_1 || '1. Вес торта (кг)'}</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[1, 1.5, 2, 2.5, 3, 4, 5].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`rounded-full px-4 py-2 text-sm sm:px-6 transition-all ${
                    weight === w
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'border border-border bg-transparent text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {w} {dict?.builder_kg || 'кг'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">{dict?.builder_step_2 || '2. Бисквит'}</h3>
            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3">
              {data.biscuits?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setBiscuit(item)}
                  className={`rounded-xl border p-4 text-left text-sm transition-all ${
                    biscuit?.name === item.name
                      ? 'border-primary bg-primary/10 text-primary shadow-sm'
                      : 'border-border/60 text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <span className="block font-medium">{item.name}</span>
                  {item.priceModifier ? (
                    <span className="text-xs opacity-70">+{item.priceModifier} ₾/{dict?.builder_kg || 'кг'}</span>
                  ) : (
                    <span className="text-xs opacity-70">{dict?.builder_included || 'Входит в цену'}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">{dict?.builder_step_3 || '3. Начинка'}</h3>
            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3">
              {data.fillings?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setFilling(item)}
                  className={`rounded-xl border p-4 text-left text-sm transition-all ${
                    filling?.name === item.name
                      ? 'border-primary bg-primary/10 text-primary shadow-sm'
                      : 'border-border/60 text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <span className="block font-medium">{item.name}</span>
                  {item.priceModifier ? (
                    <span className="text-xs opacity-70">+{item.priceModifier} ₾/{dict?.builder_kg || 'кг'}</span>
                  ) : (
                    <span className="text-xs opacity-70">{dict?.builder_included || 'Входит в цену'}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">{dict?.builder_step_4 || '4. Декор'}</h3>
            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3">
              {data.decorations?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setDecoration(item)}
                  className={`rounded-xl border p-4 text-left text-sm transition-all ${
                    decoration?.name === item.name
                      ? 'border-primary bg-primary/10 text-primary shadow-sm'
                      : 'border-border/60 text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <span className="block font-medium">{item.name}</span>
                  <span className="text-xs opacity-70">+{item.price} ₾ ({dict?.builder_fixed || 'фикс.'})</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">{dict?.builder_step_5 || '5. Пожелания (надпись, аллергия)'}</h3>
            <textarea
              rows={3}
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              placeholder={dict?.builder_wishes_placeholder || "Например: Надпись 'С Днем Рождения!'. Без орехов."}
              className="w-full resize-none rounded-xl border border-border/60 bg-transparent p-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
            />
          </div>
        </div>

        {/* Правая колонка */}
        <div className="flex h-full flex-col">
          <div className="sticky top-24 flex flex-col items-center rounded-2xl bg-card p-6 sm:p-8 shadow-sm">
            <div className="relative mb-6 sm:mb-8 aspect-square w-full max-w-[200px] sm:max-w-[280px] overflow-hidden rounded-full border-4 border-primary/15 bg-accent/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayImageUrl}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
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
            
            <div className="w-full border-t border-dashed border-border/60 pt-6">
              <h4 className="mb-4 font-serif text-lg sm:text-xl">{dict?.builder_your_order || 'Ваш заказ:'}</h4>
              <ul className="mb-6 flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>{dict?.builder_weight || 'Вес:'}</span> <span className="text-foreground text-right">{weight} {dict?.builder_kg || 'кг'}</span>
                </li>
                <li className="flex justify-between">
                  <span>{dict?.builder_biscuit || 'Бисквит:'}</span> <span className="text-foreground text-right">{biscuit?.name || dict?.builder_not_selected || 'Не выбран'}</span>
                </li>
                <li className="flex justify-between">
                  <span>{dict?.builder_filling || 'Начинка:'}</span> <span className="text-foreground text-right">{filling?.name || dict?.builder_not_selected || 'Не выбрана'}</span>
                </li>
                <li className="flex justify-between">
                  <span>{dict?.builder_decoration || 'Декор:'}</span> <span className="text-foreground text-right">{decoration?.name || dict?.builder_no_decoration || 'Без декора'}</span>
                </li>
              </ul>
              
              <div className="mb-6 sm:mb-8 flex items-end justify-between border-t border-border pt-4 sm:pt-6">
                <span className="font-serif text-base sm:text-lg">{dict?.builder_total || 'Итого:'}</span>
                <span className="font-serif text-3xl sm:text-4xl text-primary">
                  {calculateTotal()} ₾
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    {dict?.builder_date || 'Дата:'}
                  </span>
                  <input
                    type="text"
                    lang="en"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text'
                    }}
                    placeholder={dict?.builder_date_format || 'DD.MM.YYYY'}
                    min={today}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full rounded-full border border-border/60 bg-transparent py-3 pl-[4rem] pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    disabled={isSuccess || isSubmitting}
                  />
                </div>

                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder={dict?.builder_address || 'Адрес доставки (или самовывоз)'}
                  className="w-full rounded-full border border-border/60 bg-transparent px-4 sm:px-6 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  disabled={isSuccess || isSubmitting}
                />
                
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={dict?.builder_phone || 'Ваш телефон (WhatsApp / Telegram)'}
                  className="w-full rounded-full border border-border/60 bg-transparent px-4 sm:px-6 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  disabled={isSuccess || isSubmitting}
                />
                
                <button
                  onClick={handleOrder}
                  disabled={isSuccess || isSubmitting}
                  className={`mt-1 flex w-full items-center justify-center gap-2 rounded-full py-3 sm:py-4 text-sm tracking-wide text-primary-foreground transition-all ${
                    isSuccess 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-primary hover:-translate-y-1 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30'
                  } disabled:cursor-not-allowed disabled:opacity-90 disabled:hover:translate-y-0`}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <Check className="h-5 w-5" />
                      {dict?.builder_success || 'Заявка отправлена'}
                    </>
                  ) : (
                    dict?.builder_order_btn || 'Заказать'
                  )}
                </button>
              </div>
              
              {isSuccess && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {dict?.builder_success_desc || 'Мы свяжемся с вами в ближайшее время для подтверждения.'}
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}