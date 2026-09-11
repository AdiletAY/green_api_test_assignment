import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Separator } from '#/components/ui/separator'

import { GreenApiProvider, useGreenApi } from '../context/green-api-context'
import { GreenApiCredentials } from './green-api-credentials'
import { GetSettingsButton } from './get-settings-button'
import { GetStateInstanceButton } from './get-state-instance-button'
import { SendMessageForm } from './send-message-form'
import { SendFileByUrlForm } from './send-file-by-url-form'
import { ApiResponse } from './api-response'

export function GreenApiForm() {
  return (
    <GreenApiProvider>
      <GreenApiFormContent />
    </GreenApiProvider>
  )
}

function GreenApiFormContent() {
  const { apiResponse } = useGreenApi()

  return (
    <div className="flex w-full items-start gap-6">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>GREEN-API</CardTitle>
        </CardHeader>

        <CardContent>
          <GreenApiCredentials />

          <div className="mt-6 flex flex-wrap gap-2">
            <GetSettingsButton />

            <GetStateInstanceButton />
          </div>

          <Separator className="my-6" />

          <SendMessageForm />

          <Separator className="my-6" />

          <SendFileByUrlForm />
        </CardContent>
      </Card>

      <ApiResponse
        data={apiResponse.data}
        error={apiResponse.error}
        isLoading={apiResponse.isLoading}
      />
    </div>
  )
}
