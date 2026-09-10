import { z } from 'zod'

const EnvSchema = z.object({
  VITE_API_URL: z.url(),
})

const parsed = EnvSchema.parse(import.meta.env)

export const env = {
  apiUrl: parsed.VITE_API_URL,
} as const