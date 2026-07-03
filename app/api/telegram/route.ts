import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Получаем текст сообщения из запроса (с фронтенда)
    const { message } = await request.json()

    // Достаем ключи из .env.local
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    // Если ключей нет, выдаем ошибку (полезно для дебага)
    if (!botToken || !chatId) {
      console.error('Ключи Telegram не настроены в .env.local')
      return NextResponse.json(
        { error: 'Telegram credentials are not configured' },
        { status: 500 }
      )
    }

    // URL для отправки сообщения через API Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    // Отправляем запрос на сервера Telegram
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown', // Включаем поддержку жирного шрифта (звездочки в тексте)
      }),
    })

    // Если Telegram ответил ошибкой
    if (!response.ok) {
      throw new Error(`Telegram API responded with status ${response.status}`)
    }

    // Если всё прошло успешно, возвращаем ответ "Ок" на фронтенд
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}