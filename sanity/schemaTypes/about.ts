export default {
    name: 'about',
    type: 'document',
    title: 'О кондитерской (Про MarO)',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Заголовок',
        description: 'Например: О нашем подходе'
      },
      {
        name: 'description',
        type: 'text',
        title: 'Текст о кондитерской',
        description: 'Расскажите о вашей философии, ингредиентах и любви к делу.'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Фотография шефа или процесса',
        options: { hotspot: true }
      }
    ]
  }