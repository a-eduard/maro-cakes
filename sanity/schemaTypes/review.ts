export default {
  name: 'review',
  type: 'document',
  title: 'Відгуки клієнтів',
  fields: [
    {
      name: 'name',
      type: 'object',
      title: 'Ім\'я клієнта',
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
      name: 'text',
      type: 'object',
      title: 'Текст відгуку',
      options: {
        translate: true,
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || ''
      },
      fields: [
        { name: 'uk', type: 'text', title: 'Українська' },
        { name: 'ru', type: 'text', title: 'Русский' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ka', type: 'text', title: 'ქართული' }
      ]
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Оцінка (від 1 до 5)',
      initialValue: 5,
      validation: (Rule: any) => Rule.required().min(1).max(5)
    }
  ]
}