export default {
    name: 'post',
    type: 'document',
    title: 'Блог (Статьи)',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Заголовок статьи'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Ссылка (URL)',
        options: { source: 'title' }
      },
      {
        name: 'publishedAt',
        type: 'datetime',
        title: 'Дата публикации'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Обложка статьи',
        options: { hotspot: true }
      },
      {
        name: 'excerpt',
        type: 'text',
        title: 'Краткое описание (Превью для главной)'
      },
      {
        name: 'body',
        type: 'array',
        title: 'Текст статьи',
        of: [{ type: 'block' }] // Этот тип позволяет писать форматированный текст (жирный, списки и т.д.)
      }
    ]
  }