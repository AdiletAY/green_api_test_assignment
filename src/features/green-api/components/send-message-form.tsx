import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'

import { Button } from '#/components/ui/button'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'

import { useGreenApi } from '../context/green-api-context'
import { sendMessageSchema } from '../schemas/send-message.schema'
import { sendMessageFn } from '../server/functions/send-message.fn'

export function SendMessageForm() {
  const { idInstance, apiTokenInstance, apiResponse, setApiResponse } =
    useGreenApi()

  const mutation = useMutation({
    mutationFn: sendMessageFn,
  })

  const form = useForm({
    defaultValues: {
      chatId: '',
      message: '',
    },

    validators: {
      onSubmit: sendMessageSchema,
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
          message: form.state.values.message,
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
        <h3 className="text-sm font-medium">sendMessage</h3>
      </div>

      <form.Field
        name="chatId"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="green-api-chat-id">ID чата</FieldLabel>

              <Input
                id="green-api-chat-id"
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
        name="message"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="green-api-message">Сообщение</FieldLabel>

              <Textarea
                id="green-api-message"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid}
                placeholder="Введите текст сообщения..."
                maxLength={20000}
                rows={5}
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
        sendMessage
      </Button>
    </div>
  )
}
