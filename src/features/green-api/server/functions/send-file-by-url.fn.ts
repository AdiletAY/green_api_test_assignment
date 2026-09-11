import { createServerFn } from '@tanstack/react-start'

import { apiClient } from '@/lib/api/client'

import { greenApiEndpoints } from '../../api/endpoints'
import type { SendFileByUrlResponse } from '../../api/types'
import { greenApiCredentialsSchema } from '../../schemas/green-api-credentials.schema'
import { sendFileByUrlSchema } from '../../schemas/send-file-by-url.schema'

const schema = greenApiCredentialsSchema.extend(
  sendFileByUrlSchema.shape,
)

export const sendFileByUrlFn = createServerFn({ method: 'POST' })
  .validator(schema)
  .handler(async ({ data }) => {
    const response = await apiClient.post<SendFileByUrlResponse>(
      greenApiEndpoints.sendFileByUrl(
        data.idInstance,
        data.apiTokenInstance,
      ),
      {
        chatId: data.chatId,
        urlFile: data.fileUrl,
      },
    )

    return response.data
  })
