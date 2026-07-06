export default {
  name: 'settings',
  type: 'document',
  title: 'Налаштування сайту (Контакти)',
  fields: [
    {
      name: 'whatsapp',
      type: 'string',
      title: 'Номер WhatsApp (тільки цифри та плюс)',
      description: 'Наприклад: +995500000000'
    },
    {
      name: 'telegram',
      type: 'string',
      title: 'Посилання на Telegram',
      description: 'Наприклад: https://t.me/maro_bakery'
    },
    {
      name: 'instagram',
      type: 'string',
      title: 'Посилання на Instagram',
      description: 'Наприклад: https://instagram.com/maro_bakery'
    },
    {
      name: 'address',
      type: 'object',
      title: 'Адреса',
      description: 'Наприклад: Батумі, Грузія. вул. Приморська, 12',
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
    {
      name: 'workingHours',
      type: 'object',
      title: 'Час роботи',
      description: 'Наприклад: Щодня 10:00 — 20:00',
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
    }
  ]
}