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
        name: 'description',
        type: 'text',
        title: 'Описание торта',
        description: 'Краткое описание начинки, ингредиентов или особенностей.'
      },
      {
        name: 'price',
        type: 'number',
        title: 'Актуальная цена (в лари)'
      },
      {
        name: 'oldPrice',
        type: 'number',
        title: 'Старая цена (зачеркнутая)',
        description: 'Необязательное поле. Если заполнено, будет выводиться зачеркнутым рядом с актуальной ценой.'
      },
      {
        name: 'isBestseller',
        type: 'boolean',
        title: 'Показывать на главной (Хит продаж)',
        description: 'Включите тумблер, чтобы этот торт появился в блоке "Любимые торты наших гостей".',
        initialValue: false
      },
      {
        name: 'image',
        type: 'image',
        title: 'Главное фото',
        options: { hotspot: true }
      }
    ]
  }