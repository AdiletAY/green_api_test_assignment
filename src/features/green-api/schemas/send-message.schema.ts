import { z } from 'zod'

export const sendMessageSchema = z.object({
  chatId: z.string().min(1, 'Chat ID обязателен'),
  message: z.string().min(1, 'Сообщение обязательно').max(20000),
})
