import { createServerFn } from '@tanstack/react-start'
import { greenApiEndpoints } from '../../api/endpoints'
import { apiClient } from '@/lib/api/client'
import type { GetStateInstanceResponse } from '../../api/types'
import { greenApiCredentialsSchema } from '../../schemas/green-api-credentials.schema'

export const getStateInstanceFn = createServerFn({ method: 'GET' })
  .validator(greenApiCredentialsSchema)
  .handler(async ({ data }) => {
    const response = await apiClient.get<GetStateInstanceResponse>(
      greenApiEndpoints.getStateInstance(
        data.idInstance,
        data.apiTokenInstance,
      ),
    )

    return response.data
  })
