export default {
  name: 'about',
  type: 'document',
  title: 'Про кондитерську (Про MarO)',
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Заголовок',
      description: 'Наприклад: Про наш підхід',
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
      name: 'description',
      type: 'object',
      title: 'Текст про кондитерську',
      description: 'Розкажіть про вашу філософію, інгредієнти та любов до справи.',
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
      name: 'image',
      type: 'image',
      title: 'Фотографія шефа або процесу',
      options: { hotspot: true }
    }
  ]
}