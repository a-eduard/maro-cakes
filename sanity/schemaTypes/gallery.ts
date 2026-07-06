export default {
  name: 'gallery',
  type: 'document',
  title: 'Галерея (Фотографії)',
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Назва/Опис фото (для SEO та незрячих)',
      description: 'Наприклад: Багатоярусний весільний торт із квітами',
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
      name: 'image',
      type: 'image',
      title: 'Фотографія',
      options: { hotspot: true }
    },
    {
      name: 'order',
      type: 'number',
      title: 'Порядок сортування (необов\'язково)',
      description: 'Чим менша цифра, тим раніше виводиться фото'
    }
  ]
}