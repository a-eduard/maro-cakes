'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'

// Типизация данных из Sanity
interface BuilderOption {
  name: string
  priceModifier?: number
  price?: number
}

interface CakeBuilderProps {
  data: {
    basePrice: number
    biscuits: BuilderOption[]
    fillings: BuilderOption[]
    decorations: BuilderOption[]
  }
  whatsappPhone: string
}

export function CakeBuilder({ data, whatsappPhone }: CakeBuilderProps) {
  const [weight, setWeight] = useState<number>(2)
  const [biscuit, setBiscuit] = useState<BuilderOption | null>(null)
  const [filling, setFilling] = useState<BuilderOption | null>(null)
  const [decoration, setDecoration] = useState<BuilderOption | null>(null)
  const [wishes, setWishes] = useState<string>('')

  // Расчет итоговой стоимости
  const calculateTotal = () => {
    let perKg = data.basePrice
    if (biscuit?.priceModifier) perKg += biscuit.priceModifier
    if (filling?.priceModifier) perKg += filling.priceModifier
    
    let total = perKg * weight
    if (decoration?.price) total += decoration.price

    return total
  }

  // Генерация ссылки для WhatsApp
  const handleOrder = () => {
    if (!biscuit || !filling) {
      alert('Пожалуйста, выберите бисквит и начинку перед заказом.')
      return
    }

    const total = calculateTotal()
    const text = `Здравствуйте! Я хочу собрать торт на заказ:
- Вес: ${weight} кг
- Бисквит: ${biscuit.name}
- Начинка: ${filling.name}
- Декор: ${decoration?.name || 'Без декора'}
- Пожелания: ${wishes || 'Нет'}

Примерная стоимость: ${total} ₾. Подтвердите, пожалуйста, заказ.`

    const formattedPhone = whatsappPhone.replace(/[^0-9]/g, '')
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="rounded-[2rem] border border-border/60 bg-accent/5 p-6 md:p-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        
        {/* Левая колонка: Настройки */}
        <div className="flex flex-col gap-10">
          <div>
            <h3 className="mb-4 font-serif text-2xl text-foreground">1. Вес торта (кг)</h3>
            <div className="flex flex-wrap gap-3">
              {[1, 1.5, 2, 2.5, 3, 4, 5].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`rounded-full px-6 py-2 text-sm transition-colors ${
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
            <h3 className="mb-4 font-serif text-2xl text-foreground">2. Бисквит</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
            <h3 className="mb-4 font-serif text-2xl text-foreground">3. Начинка</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
            <h3 className="mb-4 font-serif text-2xl text-foreground">4. Декор</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                  <span className="text-xs opacity-70">+{item.price} ₾ (фиксированно)</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl text-foreground">5. Пожелания (надпись, аллергия)</h3>
            <textarea
              rows={3}
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              placeholder="Например: Надпись 'С Днем Рождения, мама!'. Без добавления орехов."
              className="w-full resize-none rounded-xl border border-border/60 bg-transparent p-4 text-sm text-foreground outline-none transition-colors focus:border-rose-400"
            />
          </div>
        </div>

        {/* Правая колонка: Итог и фото */}
        <div className="flex h-full flex-col">
          <div className="sticky top-32 flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm">
            <div className="relative mb-8 aspect-square w-full max-w-[280px] overflow-hidden rounded-full border-4 border-rose-50">
              {/* Статичная красивая картинка-заглушка для конструктора */}
              <Image
                src="/images/hero-cake.png"
                alt="Ваш идеальный торт"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="w-full border-t border-dashed border-border/60 pt-6">
              <h4 className="mb-4 font-serif text-xl">Ваш заказ:</h4>
              <ul className="mb-6 flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Вес:</span> <span className="text-foreground">{weight} кг</span>
                </li>
                <li className="flex justify-between">
                  <span>Бисквит:</span> <span className="text-foreground">{biscuit?.name || 'Не выбран'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Начинка:</span> <span className="text-foreground">{filling?.name || 'Не выбрана'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Декор:</span> <span className="text-foreground">{decoration?.name || 'Без декора'}</span>
                </li>
              </ul>
              
              <div className="mb-8 flex items-end justify-between border-t border-border pt-6">
                <span className="font-serif text-lg">Итого:</span>
                <span className="font-serif text-4xl text-rose-400">
                  {calculateTotal()} ₾
                </span>
              </div>

              <button
                onClick={handleOrder}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-400 py-4 text-sm tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-400/30"
              >
                <MessageCircle className="h-5 w-5" />
                Оформить в WhatsApp
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}