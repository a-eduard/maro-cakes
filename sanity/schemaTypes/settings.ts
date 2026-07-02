export default {
    name: 'settings',
    type: 'document',
    title: 'Настройки сайта (Контакты)',
    fields: [
      {
        name: 'whatsapp',
        type: 'string',
        title: 'Номер WhatsApp (только цифры и плюс)',
        description: 'Например: +995500000000'
      },
      {
        name: 'telegram',
        type: 'string',
        title: 'Ссылка на Telegram',
        description: 'Например: https://t.me/maro_bakery'
      },
      {
        name: 'instagram',
        type: 'string',
        title: 'Ссылка на Instagram',
        description: 'Например: https://instagram.com/maro_bakery'
      },
      {
        name: 'address',
        type: 'string',
        title: 'Адрес',
        description: 'Например: Батуми, Грузия. ул. Приморская, 12'
      },
      {
        name: 'workingHours',
        type: 'string',
        title: 'Время работы',
        description: 'Например: Ежедневно 10:00 — 20:00'
      }
    ]
  }