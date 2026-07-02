export default {
    name: 'cakeBuilder',
    type: 'document',
    title: 'Настройки конструктора',
    fields: [
      {
        name: 'basePrice',
        type: 'number',
        title: 'Базовая цена за 1 кг (лари)',
        description: 'Начальная цена торта за 1 кг без учета премиум-начинок и декора.',
        initialValue: 80
      },
      {
        name: 'biscuits',
        type: 'array',
        title: 'Виды бисквита',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Название (напр., Шоколадный)' },
              { name: 'priceModifier', type: 'number', title: 'Надбавка к цене за 1 кг (если нет, ставьте 0)', initialValue: 0 }
            ]
          }
        ]
      },
      {
        name: 'fillings',
        type: 'array',
        title: 'Начинки',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Название (напр., Сникерс)' },
              { name: 'priceModifier', type: 'number', title: 'Надбавка к цене за 1 кг (если нет, ставьте 0)', initialValue: 0 }
            ]
          }
        ]
      },
      {
        name: 'decorations',
        type: 'array',
        title: 'Декор (фиксированная цена)',
        description: 'Цена прибавляется к итогу независимо от веса',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Название (напр., Свежие ягоды)' },
              { name: 'price', type: 'number', title: 'Фиксированная цена', initialValue: 20 }
            ]
          }
        ]
      },
      {
        name: 'combinations',
        type: 'array',
        title: 'Фотографии разрезов (Бисквит + Начинка)',
        description: 'Загрузите фото для конкретных сочетаний. Если фото для выбранной пары нет, будет показано стандартное изображение.',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'biscuitName',
                type: 'string',
                title: 'Название бисквита (должно точно совпадать с названием из списка выше)',
              },
              {
                name: 'fillingName',
                type: 'string',
                title: 'Название начинки (должно точно совпадать с названием из списка выше)',
              },
              {
                name: 'image',
                type: 'image',
                title: 'Фотография разреза',
                options: { hotspot: true }
              }
            ],
            preview: {
              select: {
                title: 'biscuitName',
                subtitle: 'fillingName',
                media: 'image'
              },
              prepare(selection: any) {
                const {title, subtitle, media} = selection
                return {
                  title: `${title || '???'} + ${subtitle || '???'}`,
                  media: media
                }
              }
            }
          }
        ]
      }
    ]
  }