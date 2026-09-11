import { GreenApiForm } from '#/features/green-api/components/green-api-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <GreenApiForm />
    </div>
  )
}
