import { z } from 'zod'

export const greenApiCredentialsSchema = z.object({
  idInstance: z.string().trim().min(1, 'ID экземпляра обязателен'),
  apiTokenInstance: z.string().trim().min(1, 'API-токен экземпляра обязателен'),
})
