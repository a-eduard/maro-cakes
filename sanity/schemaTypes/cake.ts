export default {
  name: 'cake',
  type: 'document',
  title: 'Торти (Каталог)', // Интерфейс БД на украинском
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Назва торту',
      options: { 
        translate: true, // Включаем кнопку перевода для этого поля
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || ''
      },
      fields: [
        // uk идет первым — с него будет осуществляться автоматический перевод
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
        source: (doc: any) => doc.title?.uk || '', // Генерируем ссылку с украинской версии
        maxLength: 96
      }
    },
    {
      name: 'description',
      type: 'object',
      title: 'Опис торту',
      description: 'Короткий опис начинки, інгредієнтів або особливостей.',
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
      name: 'price',
      type: 'number',
      title: 'Актуальна ціна (в ларі)'
    },
    {
      name: 'oldPrice',
      type: 'number',
      title: 'Стара ціна (закреслена)',
      description: 'Необов\'язкове поле. Якщо заповнено, виводитиметься закресленим поруч із актуальною ціною.'
    },
    {
      name: 'isBestseller',
      type: 'boolean',
      title: 'Показувати на головній (Хіт продажу)',
      description: 'Увімкніть, щоб цей торт з\'явився в блоці "Улюблені торти наших гостей".',
      initialValue: false
    },
    {
      name: 'image',
      type: 'image',
      title: 'Головне фото',
      options: { hotspot: true }
    }
  ]
}