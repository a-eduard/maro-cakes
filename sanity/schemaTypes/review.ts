export default {
  name: 'review',
  type: 'document',
  title: 'Відгуки клієнтів', //[cite: 33]
  fields: [
    {
      name: 'name',
      type: 'object',
      title: 'Ім\'я клієнта', //[cite: 33]
      options: {
        translate: true, //[cite: 33]
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || '' //[cite: 33]
      },
      fields: [
        { name: 'uk', type: 'string', title: 'Українська' }, //[cite: 33]
        { name: 'ru', type: 'string', title: 'Русский' }, //[cite: 33]
        { name: 'en', type: 'string', title: 'English' }, //[cite: 33]
        { name: 'ka', type: 'string', title: 'ქართული' } //[cite: 33]
      ]
    },
    {
      name: 'text',
      type: 'object',
      title: 'Текст відгуку', //[cite: 33]
      options: {
        translate: true, //[cite: 33]
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || '' //[cite: 33]
      },
      fields: [
        { name: 'uk', type: 'text', title: 'Українська' }, //[cite: 33]
        { name: 'ru', type: 'text', title: 'Русский' }, //[cite: 33]
        { name: 'en', type: 'text', title: 'English' }, //[cite: 33]
        { name: 'ka', type: 'text', title: 'ქართული' } //[cite: 33]
      ]
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Оцінка (від 1 до 5)', //[cite: 33]
      initialValue: 5, //[cite: 33]
      validation: (Rule: any) => Rule.required().min(1).max(5) //[cite: 33]
    },
    // Новое поле для загрузки файлов/изображений
    {
      name: 'images',
      type: 'array',
      title: 'Фотографії / Файли',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid'
      }
    }
  ]
}