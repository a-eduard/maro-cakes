import React, { useCallback } from 'react'
import { useFormValue, set, unset } from 'sanity'
import { Select } from '@sanity/ui'

// 1. Кастомный выпадающий список для Бисквитов
const BiscuitSelect = (props: any) => {
  const { value, onChange } = props
  // Читаем массив бисквитов прямо из текущего документа
  const biscuits: any = useFormValue(['biscuits']) || []

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue) : unset())
  }, [onChange])

  return (
    <Select value={value || ''} onChange={handleChange}>
      <option value="">--- Выберите бисквит ---</option>
      {biscuits.map((b: any) => (
        b.name ? <option key={b.name} value={b.name}>{b.name}</option> : null
      ))}
    </Select>
  )
}

// 2. Кастомный выпадающий список для Начинок
const FillingSelect = (props: any) => {
  const { value, onChange } = props
  // Читаем массив начинок прямо из текущего документа
  const fillings: any = useFormValue(['fillings']) || []

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue) : unset())
  }, [onChange])

  return (
    <Select value={value || ''} onChange={handleChange}>
      <option value="">--- Выберите начинку ---</option>
      {fillings.map((f: any) => (
        f.name ? <option key={f.name} value={f.name}>{f.name}</option> : null
      ))}
    </Select>
  )
}

// 3. Сама схема документа
export default {
  name: 'cakeBuilder',
  type: 'document',
  title: 'Настройки конструктора',
  fields: [
    {
      name: 'basePrice',
      type: 'number',
      title: 'Базовая цена за 1 кг (лари)',
      description: 'Начальная цена торта за 1 кг без учета премиум-начинок и декора.',
      initialValue: 80
    },
    {
      name: 'biscuits',
      type: 'array',
      title: 'Виды бисквита',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Название (напр., Шоколадный)' },
            { name: 'priceModifier', type: 'number', title: 'Надбавка к цене за 1 кг (если нет, ставьте 0)', initialValue: 0 }
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
            { name: 'name', type: 'string', title: 'Название (напр., Сникерс)' },
            { name: 'priceModifier', type: 'number', title: 'Надбавка к цене за 1 кг (если нет, ставьте 0)', initialValue: 0 }
          ]
        }
      ]
    },
    {
      name: 'decorations',
      type: 'array',
      title: 'Декор (фиксированная цена)',
      description: 'Цена прибавляется к итогу независимо от веса',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Название (напр., Свежие ягоды)' },
            { name: 'price', type: 'number', title: 'Фиксированная цена', initialValue: 20 }
          ]
        }
      ]
    },
    {
      name: 'combinations',
      type: 'array',
      title: 'Фотографии разрезов (Бисквит + Начинка)',
      description: 'Загрузите фото для конкретных сочетаний. Если фото для выбранной пары нет, будет показано стандартное изображение.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'biscuitName',
              type: 'string',
              title: 'Название бисквита',
              // Подключаем наш кастомный компонент
              components: {
                input: BiscuitSelect
              }
            },
            {
              name: 'fillingName',
              type: 'string',
              title: 'Название начинки',
              // Подключаем наш кастомный компонент
              components: {
                input: FillingSelect
              }
            },
            {
              name: 'image',
              type: 'image',
              title: 'Фотография разреза',
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