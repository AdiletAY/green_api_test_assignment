import { useMutation } from '@tanstack/react-query'

import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'

import { useGreenApi } from '../context/green-api-context'
import { getSettingsFn } from '../server/functions/get-settings.fn'
import { greenApiCredentialsSchema } from '../schemas/green-api-credentials.schema'

export function GetSettingsButton() {
  const { idInstance, apiTokenInstance, apiResponse, setApiResponse } =
    useGreenApi()

  const mutation = useMutation({
    mutationFn: getSettingsFn,
  })

  const handleClick = () => {
    const validation = greenApiCredentialsSchema.safeParse({
      idInstance,
      apiTokenInstance,
    })

    if (!validation.success) {
      return
    }

    setApiResponse({
      data: null,
      error: null,
      isLoading: true,
    })

    mutation.mutate(
      {
        data: {
          idInstance,
          apiTokenInstance,
        },
      },
      {
        onSuccess: (data) => {
          setApiResponse({
            data,
            error: null,
            isLoading: false,
          })
        },

        onError: (error) => {
          setApiResponse({
            data: null,
            error,
            isLoading: false,
          })
        },
      },
    )
  }

  return (
    <Button
      type="button"
      disabled={apiResponse.isLoading || mutation.isPending}
      onClick={handleClick}
    >
      {mutation.isPending && <Spinner data-icon="inline-start" />}
      getSettings
    </Button>
  )
}
