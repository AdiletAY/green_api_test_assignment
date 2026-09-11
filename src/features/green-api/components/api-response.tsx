import { Check, Clipboard, Code2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { ScrollArea } from '#/components/ui/scroll-area'
import { Separator } from '#/components/ui/separator'
import { Spinner } from '#/components/ui/spinner'

type ApiResponseProps = {
  data: unknown
  error?: unknown
  isLoading?: boolean
}

function normalizeValue(value: unknown) {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
    }
  }

  return value
}

export function ApiResponse({
  data,
  error,
  isLoading = false,
}: ApiResponseProps) {
  const [copied, setCopied] = useState(false)

  const value = normalizeValue(error ?? data)

  const json =
    value !== null && value !== undefined
      ? JSON.stringify(value, null, 2)
      : null

  const hasResponse =
    error !== null && error !== undefined
      ? true
      : data !== null && data !== undefined

  const handleCopy = async () => {
    if (!json) {
      return
    }

    await navigator.clipboard.writeText(json)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <Card className="h-fit w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md border bg-muted">
            <Code2 className="size-4" />
          </div>

          <CardTitle className="text-base">Ответ API</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-muted-foreground">
            <Spinner className="size-5" />

            <p className="text-sm">Ожидание ответа от API...</p>
          </div>
        ) : error ? (
          <ScrollArea className="h-[500px]">
            <pre className="p-6 text-sm leading-6 text-destructive">
              <code>{json}</code>
            </pre>
          </ScrollArea>
        ) : hasResponse ? (
          <ScrollArea className="h-[500px]">
            <pre className="p-6 font-mono text-sm leading-6">
              <code>{json}</code>
            </pre>
          </ScrollArea>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
            <Code2 className="size-8 opacity-40" />

            <p className="text-sm font-medium">Ответа пока нет</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
