export default {
    name: 'faq',
    type: 'document',
    title: 'FAQ (Вопрос-ответ)',
    fields: [
      {
        name: 'question',
        type: 'string',
        title: 'Вопрос',
        description: 'Например: За сколько дней нужно делать заказ?',
        validation: (Rule: any) => Rule.required().error('Вопрос обязателен'),
      },
      {
        name: 'answer',
        type: 'text',
        title: 'Ответ',
        description: 'Развернутый ответ на вопрос клиента.',
        validation: (Rule: any) => Rule.required().error('Ответ обязателен'),
      },
      {
        name: 'order',
        type: 'number',
        title: 'Порядок отображения',
        description: 'Чем меньше цифра, тем выше вопрос в списке (например, 1, 2, 3...).',
        initialValue: 0,
      }
    ],
    preview: {
      select: {
        title: 'question',
        subtitle: 'answer',
      },
    },
  }