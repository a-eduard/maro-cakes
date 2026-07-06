import React, { useCallback } from 'react'
import { useFormValue, set, unset } from 'sanity'
import { Select } from '@sanity/ui'

// 1. Кастомний випадаючий список для Бісквітів
const BiscuitSelect = (props: any) => {
  const { value, onChange } = props
  const biscuits: any = useFormValue(['biscuits']) || []

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue) : unset())
  }, [onChange])

  return (
    <Select value={value || ''} onChange={handleChange}>
      <option value="">--- Оберіть бісквіт ---</option>
      {biscuits.map((b: any) => {
        const label = b.name?.uk || ''
        return label ? <option key={label} value={label}>{label}</option> : null
      })}
    </Select>
  )
}

// 2. Кастомний випадаючий список для Начинок
const FillingSelect = (props: any) => {
  const { value, onChange } = props
  const fillings: any = useFormValue(['fillings']) || []

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue) : unset())
  }, [onChange])

  return (
    <Select value={value || ''} onChange={handleChange}>
      <option value="">--- Оберіть начинку ---</option>
      {fillings.map((f: any) => {
        const label = f.name?.uk || ''
        return label ? <option key={label} value={label}>{label}</option> : null
      })}
    </Select>
  )
}

// 3. Сама схема документа
export default {
  name: 'cakeBuilder',
  type: 'document',
  title: 'Налаштування конструктора',
  fields: [
    {
      name: 'basePrice',
      type: 'number',
      title: 'Базова ціна за 1 кг (ларі)',
      description: 'Початкова ціна торта за 1 кг без урахування преміум-начинок і декору.',
      initialValue: 80
    },
    {
      name: 'biscuits',
      type: 'array',
      title: 'Види бісквіта',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'name', 
              type: 'object', 
              title: 'Назва (напр., Шоколадний)',
              options: {
                translate: true,
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || ''
              },
              fields: [
                { name: 'uk', type: 'string', title: 'Українська' },
                { name: 'ru', type: 'string', title: 'Русский' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'ka', type: 'string', title: 'ქართული' }
              ]
            },
            { name: 'priceModifier', type: 'number', title: 'Надбавка до ціни за 1 кг (якщо немає, ставте 0)', initialValue: 0 }
          ]
        }
      ]
    },
    {
      name: 'fillings',
      type: 'array',
      title: 'Начинки',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'name', 
              type: 'object', 
              title: 'Назва (напр., Снікерс)',
              options: {
                translate: true,
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || ''
              },
              fields: [
                { name: 'uk', type: 'string', title: 'Українська' },
                { name: 'ru', type: 'string', title: 'Русский' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'ka', type: 'string', title: 'ქართული' }
              ]
            },
            { name: 'priceModifier', type: 'number', title: 'Надбавка до ціни за 1 кг (якщо немає, ставте 0)', initialValue: 0 }
          ]
        }
      ]
    },
    {
      name: 'decorations',
      type: 'array',
      title: 'Декор (фіксована ціна)',
      description: 'Ціна додається до підсумку незалежно від ваги',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'name', 
              type: 'object', 
              title: 'Назва (напр., Свіжі ягоди)',
              options: {
                translate: true,
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || ''
              },
              fields: [
                { name: 'uk', type: 'string', title: 'Українська' },
                { name: 'ru', type: 'string', title: 'Русский' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'ka', type: 'string', title: 'ქართული' }
              ]
            },
            { name: 'price', type: 'number', title: 'Фіксована ціна', initialValue: 20 }
          ]
        }
      ]
    },
    {
      name: 'combinations',
      type: 'array',
      title: 'Фотографії розрізів (Бісквіт + Начинка)',
      description: 'Завантажте фото для конкретних поєднань. Якщо фото для обраної пари немає, буде показано стандартне зображення.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'biscuitName',
              type: 'string',
              title: 'Назва бісквіта',
              components: {
                input: BiscuitSelect
              }
            },
            {
              name: 'fillingName',
              type: 'string',
              title: 'Назва начинки',
              components: {
                input: FillingSelect
              }
            },
            {
              name: 'image',
              type: 'image',
              title: 'Фотографія розрізу',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: {
              title: 'biscuitName',
              subtitle: 'fillingName',
              media: 'image'
            },
            prepare(selection: any) {
              const {title, subtitle, media} = selection
              return {
                title: `${title || '???'} + ${subtitle || '???'}`,
                media: media
              }
            }
          }
        }
      ]
    }
  ]
}