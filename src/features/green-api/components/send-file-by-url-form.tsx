import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'

import { Button } from '#/components/ui/button'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'

import { useGreenApi } from '../context/green-api-context'
import { sendFileByUrlSchema } from '../schemas/send-file-by-url.schema'
import { sendFileByUrlFn } from '../server/functions/send-file-by-url.fn'

export function SendFileByUrlForm() {
  const { idInstance, apiTokenInstance, apiResponse, setApiResponse } =
    useGreenApi()

  const mutation = useMutation({
    mutationFn: sendFileByUrlFn,
  })

  const form = useForm({
    defaultValues: {
      chatId: '',
      fileUrl: '',
    },

    validators: {
      onSubmit: sendFileByUrlSchema,
    },
  })

  const handleSubmit = async () => {
    const validation = await form.validate('submit')

    if (!validation) {
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
          chatId: form.state.values.chatId,
          fileUrl: form.state.values.fileUrl,
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
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Send File By URL</h3>

        <p className="text-sm text-muted-foreground">
          Send an image, video, audio file, or document using a URL.
        </p>
      </div>

      <form.Field
        name="chatId"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="green-api-file-chat-id">Chat ID</FieldLabel>

              <Input
                id="green-api-file-chat-id"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid}
                placeholder="79876543210@c.us"
              />

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <form.Field
        name="fileUrl"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="green-api-file-url">File URL</FieldLabel>

              <Input
                id="green-api-file-url"
                name={field.name}
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid}
                placeholder="https://example.com/image.jpg"
              />

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <Button
        type="button"
        disabled={apiResponse.isLoading || mutation.isPending}
        onClick={handleSubmit}
      >
        {mutation.isPending && <Spinner data-icon="inline-start" />}
        sendFileByUrl
      </Button>
    </div>
  )
}
