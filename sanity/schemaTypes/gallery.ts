export default {
    name: 'gallery',
    type: 'document',
    title: 'Галерея (Фотографии)',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Название/Описание фото (для SEO и слепых)',
        description: 'Например: Многоярусный свадебный торт с цветами'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Фотография',
        options: { hotspot: true }
      },
      {
        name: 'order',
        type: 'number',
        title: 'Порядок сортировки (необязательно)',
        description: 'Чем меньше цифра, тем раньше выводится фото'
      }
    ]
  }