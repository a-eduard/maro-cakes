export default {
  name: 'post',
  type: 'document',
  title: 'Блог (Статті)',
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Заголовок статті',
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
      name: 'slug',
      type: 'slug',
      title: 'Посилання (URL)',
      options: { 
        source: (doc: any) => doc.title?.uk || '', 
        maxLength: 96 
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Дата публікації'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Обкладинка статті',
      options: { hotspot: true }
    },
    {
      name: 'excerpt',
      type: 'object',
      title: 'Короткий опис (Прев\'ю для головної)',
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
      name: 'body',
      type: 'object',
      title: 'Текст статті',
      options: {
        translate: true,
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || ''
      },
      // Заменили array of blocks на обычный text, чтобы плагин работал
      fields: [
        { name: 'uk', type: 'text', title: 'Українська' },
        { name: 'ru', type: 'text', title: 'Русский' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ka', type: 'text', title: 'ქართული' }
      ]
    }
  ]
}