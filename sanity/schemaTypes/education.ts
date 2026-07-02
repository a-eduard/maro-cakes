export default {
    name: 'education',
    type: 'document',
    title: 'Блок: Обучение',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Заголовок',
        description: 'Например: Обучение кондитерскому искусству'
      },
      {
        name: 'description',
        type: 'text',
        title: 'Описание',
        description: 'Текст о том, как проходят мастер-классы'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Фотография процесса обучения',
        options: { hotspot: true }
      }
    ]
  }