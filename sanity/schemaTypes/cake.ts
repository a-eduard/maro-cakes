export default {
    name: 'cake',
    type: 'document',
    title: 'Торты (Каталог)',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Название торта (например: Медовик)'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Ссылка (URL)',
        options: { source: 'title' }
      },
      {
        name: 'price',
        type: 'number',
        title: 'Цена (в лари)'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Главное фото',
        options: { hotspot: true }
      }
    ]
  }