export default {
  name: 'education',
  type: 'document',
  title: 'Блок: Навчання',
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Заголовок',
      description: 'Наприклад: Навчання кондитерському мистецтву',
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
      title: 'Опис',
      description: 'Текст про те, як проходять майстер-класи',
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
      title: 'Фотографія процесу навчання',
      options: { hotspot: true }
    }
  ]
}