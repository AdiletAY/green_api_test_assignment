import { z } from 'zod'

export const sendFileByUrlSchema = z.object({
  chatId: z.string().min(1, 'Chat ID обязателен'),
  fileUrl: z.string().url('Введите корректный URL'),
})
