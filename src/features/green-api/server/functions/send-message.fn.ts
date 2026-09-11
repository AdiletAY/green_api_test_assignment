import { createServerFn } from '@tanstack/react-start'

import { apiClient } from '@/lib/api/client'

import { greenApiEndpoints } from '../../api/endpoints'
import type { SendMessageResponse } from '../../api/types'
import { greenApiCredentialsSchema } from '../../schemas/green-api-credentials.schema'
import { sendMessageSchema } from '../../schemas/send-message.schema'

const schema = greenApiCredentialsSchema.extend(
  sendMessageSchema.shape,
)

export const sendMessageFn = createServerFn({ method: 'POST' })
  .validator(schema)
  .handler(async ({ data }) => {
    const response = await apiClient.post<SendMessageResponse>(
      greenApiEndpoints.sendMessage(
        data.idInstance,
        data.apiTokenInstance,
      ),
      {
        chatId: data.chatId,
        message: data.message,
      },
    )

    return response.data
  })
