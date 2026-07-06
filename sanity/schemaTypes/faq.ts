export default {
  name: 'faq',
  type: 'document',
  title: 'FAQ (Питання-відповідь)',
  fields: [
    {
      name: 'question',
      type: 'object',
      title: 'Питання',
      description: 'Наприклад: За скільки днів потрібно робити замовлення?',
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
      name: 'answer',
      type: 'object',
      title: 'Відповідь',
      description: 'Розгорнута відповідь на запитання клієнта.',
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
      name: 'order',
      type: 'number',
      title: 'Порядок відображення',
      description: 'Чим менша цифра, тим вище питання у списку (наприклад, 1, 2, 3...).',
      initialValue: 0,
    }
  ],
  preview: {
    select: {
      title: 'question.uk', // Берем украинскую версию для превью в админке
      subtitle: 'answer.uk',
    },
  },
}