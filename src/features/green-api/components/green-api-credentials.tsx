import { useForm } from '@tanstack/react-form'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'

import { greenApiCredentialsSchema } from '../schemas/green-api-credentials.schema'
import { useGreenApi } from '../context/green-api-context'

export function GreenApiCredentials() {
  const { idInstance, apiTokenInstance, setIdInstance, setApiTokenInstance } =
    useGreenApi()

  const form = useForm({
    defaultValues: {
      idInstance,
      apiTokenInstance,
    },

    validators: {
      onSubmit: greenApiCredentialsSchema,
    },
  })

  return (
    <FieldGroup>
      <form.Field
        name="idInstance"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="green-api-form-id-instance">
                idInstance
              </FieldLabel>

              <Input
                id="green-api-form-id-instance"
                name={field.name}
                value={idInstance}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                  setIdInstance(e.target.value)
                }}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid}
                placeholder="123456..."
                type="text"
              />

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <form.Field
        name="apiTokenInstance"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="green-api-form-api-token-instance">
                apiTokenInstance
              </FieldLabel>

              <Input
                id="green-api-form-api-token-instance"
                name={field.name}
                value={apiTokenInstance}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                  setApiTokenInstance(e.target.value)
                }}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid}
                placeholder="Введите apiTokenInstance"
                type="password"
              />

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />
    </FieldGroup>
  )
}
