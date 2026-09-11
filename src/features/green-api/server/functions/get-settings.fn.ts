import { createServerFn } from '@tanstack/react-start'

import { apiClient } from '@/lib/api/client'

import { greenApiEndpoints } from '../../api/endpoints'
import type { GetSettingsResponse } from '../../api/types'
import { greenApiCredentialsSchema } from '../../schemas/green-api-credentials.schema'

export const getSettingsFn = createServerFn({ method: 'GET' })
  .validator(greenApiCredentialsSchema)
  .handler(async ({ data }) => {
    const response = await apiClient.get<GetSettingsResponse>(
      greenApiEndpoints.getSettings(data.idInstance, data.apiTokenInstance),
    )

    return response.data
  })
