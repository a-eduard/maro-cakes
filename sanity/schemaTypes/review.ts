export default {
    name: 'review',
    type: 'document',
    title: 'Отзывы клиентов',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Имя клиента'
      },
      {
        name: 'text',
        type: 'text',
        title: 'Текст отзыва'
      },
      {
        name: 'rating',
        type: 'number',
        title: 'Оценка (от 1 до 5)',
        initialValue: 5,
        validation: (Rule: any) => Rule.required().min(1).max(5)
      }
    ]
  }