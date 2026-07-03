'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2, Check } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

// Типизация данных из Sanity
interface BuilderOption {
  name: string
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
}

export function CakeBuilder({ data }: CakeBuilderProps) {
  const [weight, setWeight] = useState<number>(2)
  const [biscuit, setBiscuit] = useState<BuilderOption | null>(null)
  const [filling, setFilling] = useState<BuilderOption | null>(null)
  const [decoration, setDecoration] = useState<BuilderOption | null>(null)
  const [wishes, setWishes] = useState<string>('')
  
  // Контактные данные
  const [deliveryDate, setDeliveryDate] = useState<string>('')
  const [deliveryAddress, setDeliveryAddress] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  
  // Состояния для кнопки отправки
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Расчет итоговой стоимости
  const calculateTotal = () => {
    let perKg = data.basePrice
    if (biscuit?.priceModifier) perKg += biscuit.priceModifier
    if (filling?.priceModifier) perKg += filling.priceModifier
    
    let total = perKg * weight
    if (decoration?.price) total += decoration.price

    return total
  }

  // Получаем сегодняшнюю дату в формате YYYY-MM-DD для ограничения выбора в календаре
  const today = new Date().toISOString().split('T')[0]

  // Отправка заявки
  const handleOrder = async () => {
    if (!biscuit || !filling) {
      alert('Пожалуйста, выберите бисквит и начинку перед заказом.')
      return
    }
    if (!deliveryDate) {
      alert('Пожалуйста, укажите дату, на которую нужен торт.')
      return
    }
    if (!phone.trim()) {
      alert('Пожалуйста, укажите ваш номер телефона или логин в Telegram.')
      return
    }

    setIsSubmitting(true)

    const total = calculateTotal()
    
    const text = `🎂 *Новый заказ из конструктора!*\n\n` +
      `📞 *Связь:* ${phone}\n` +
      `📅 *Дата:* ${deliveryDate}\n` +
      `📍 *Адрес:* ${deliveryAddress || 'Самовывоз / Не указан'}\n` +
      `⚖️ *Вес:* ${weight} кг\n` +
      `🍰 *Бисквит:* ${biscuit.name}\n` +
      `🍓 *Начинка:* ${filling.name}\n` +
      `✨ *Декор:* ${decoration?.name || 'Без декора'}\n` +
      `📝 *Пожелания:* ${wishes || 'Нет'}\n\n` +
      `💰 *Примерная стоимость:* ${total} ₾`

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.')
      }
    } catch (error) {
      alert('Ошибка сети. Пожалуйста, проверьте подключение и попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentCombo = data.combinations?.find(
    (combo) => 
      combo.biscuitName === biscuit?.name && 
      combo.fillingName === filling?.name
  )

  const displayImageUrl = currentCombo?.image
    ? urlFor(currentCombo.image).url()
    : '/images/hero-cake.png'

  return (
    <div className="rounded-[1.5rem] border border-border/60 bg-accent/5 p-4 sm:rounded-[2rem] sm:p-8 md:p-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        
        {/* Левая колонка: Настройки */}
        <div className="flex flex-col gap-8 sm:gap-10">
          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">1. Вес торта (кг)</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[1, 1.5, 2, 2.5, 3, 4, 5].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`rounded-full px-4 py-2 text-sm sm:px-6 transition-colors ${
                    weight === w
                      ? 'bg-rose-400 text-white'
                      : 'border border-border bg-transparent text-muted-foreground hover:border-rose-400 hover:text-rose-400'
                  }`}
                >
                  {w} кг
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">2. Бисквит</h3>
            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3">
              {data.biscuits?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setBiscuit(item)}
                  className={`rounded-xl border p-4 text-left text-sm transition-all ${
                    biscuit?.name === item.name
                      ? 'border-rose-400 bg-rose-50/50 text-rose-950'
                      : 'border-border/60 text-muted-foreground hover:border-rose-200'
                  }`}
                >
                  <span className="block font-medium">{item.name}</span>
                  {item.priceModifier ? (
                    <span className="text-xs opacity-70">+{item.priceModifier} ₾/кг</span>
                  ) : (
                    <span className="text-xs opacity-70">Входит в цену</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">3. Начинка</h3>
            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3">
              {data.fillings?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setFilling(item)}
                  className={`rounded-xl border p-4 text-left text-sm transition-all ${
                    filling?.name === item.name
                      ? 'border-rose-400 bg-rose-50/50 text-rose-950'
                      : 'border-border/60 text-muted-foreground hover:border-rose-200'
                  }`}
                >
                  <span className="block font-medium">{item.name}</span>
                  {item.priceModifier ? (
                    <span className="text-xs opacity-70">+{item.priceModifier} ₾/кг</span>
                  ) : (
                    <span className="text-xs opacity-70">Входит в цену</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">4. Декор</h3>
            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3">
              {data.decorations?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setDecoration(item)}
                  className={`rounded-xl border p-4 text-left text-sm transition-all ${
                    decoration?.name === item.name
                      ? 'border-rose-400 bg-rose-50/50 text-rose-950'
                      : 'border-border/60 text-muted-foreground hover:border-rose-200'
                  }`}
                >
                  <span className="block font-medium">{item.name}</span>
                  <span className="text-xs opacity-70">+{item.price} ₾ (фикс.)</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl text-foreground sm:text-2xl">5. Пожелания (надпись, аллергия)</h3>
            <textarea
              rows={3}
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              placeholder="Например: Надпись 'С Днем Рождения!'. Без орехов."
              className="w-full resize-none rounded-xl border border-border/60 bg-transparent p-4 text-sm text-foreground outline-none transition-colors focus:border-rose-400"
            />
          </div>
        </div>

        {/* Правая колонка: Итог и фото */}
        <div className="flex h-full flex-col">
          <div className="sticky top-24 flex flex-col items-center rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
            <div className="relative mb-6 sm:mb-8 aspect-square w-full max-w-[200px] sm:max-w-[280px] overflow-hidden rounded-full border-4 border-rose-50">
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
                    alt="Ваш идеальный торт"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="w-full border-t border-dashed border-border/60 pt-6">
              <h4 className="mb-4 font-serif text-lg sm:text-xl">Ваш заказ:</h4>
              <ul className="mb-6 flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Вес:</span> <span className="text-foreground text-right">{weight} кг</span>
                </li>
                <li className="flex justify-between">
                  <span>Бисквит:</span> <span className="text-foreground text-right">{biscuit?.name || 'Не выбран'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Начинка:</span> <span className="text-foreground text-right">{filling?.name || 'Не выбрана'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Декор:</span> <span className="text-foreground text-right">{decoration?.name || 'Без декора'}</span>
                </li>
              </ul>
              
              <div className="mb-6 sm:mb-8 flex items-end justify-between border-t border-border pt-4 sm:pt-6">
                <span className="font-serif text-base sm:text-lg">Итого:</span>
                <span className="font-serif text-3xl sm:text-4xl text-rose-400">
                  {calculateTotal()} ₾
                </span>
              </div>

              {/* Блок с контактными данными и кнопкой */}
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    Дата:
                  </span>
                  <input
                    type="date"
                    min={today}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full rounded-full border border-border/60 bg-transparent py-3 pl-[4rem] pr-4 text-sm text-foreground outline-none transition-colors focus:border-rose-400"
                    disabled={isSuccess || isSubmitting}
                  />
                </div>

                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Адрес доставки (или самовывоз)"
                  className="w-full rounded-full border border-border/60 bg-transparent px-4 sm:px-6 py-3 text-sm text-foreground outline-none transition-colors focus:border-rose-400"
                  disabled={isSuccess || isSubmitting}
                />
                
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ваш телефон (WhatsApp / Telegram)"
                  className="w-full rounded-full border border-border/60 bg-transparent px-4 sm:px-6 py-3 text-sm text-foreground outline-none transition-colors focus:border-rose-400"
                  disabled={isSuccess || isSubmitting}
                />
                
                <button
                  onClick={handleOrder}
                  disabled={isSuccess || isSubmitting}
                  className={`mt-1 flex w-full items-center justify-center gap-2 rounded-full py-3 sm:py-4 text-sm tracking-wide text-white transition-all ${
                    isSuccess 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-rose-400 hover:-translate-y-1 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-400/30'
                  } disabled:cursor-not-allowed disabled:opacity-90 disabled:hover:translate-y-0`}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <Check className="h-5 w-5" />
                      Заявка отправлена
                    </>
                  ) : (
                    'Заказать'
                  )}
                </button>
              </div>
              
              {isSuccess && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время для подтверждения.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}