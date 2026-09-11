import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type ApiResponse = {
  data: unknown
  error: unknown
  isLoading: boolean
}

type GreenApiContextValue = {
  idInstance: string
  apiTokenInstance: string
  setIdInstance: (value: string) => void
  setApiTokenInstance: (value: string) => void
  apiResponse: ApiResponse
  setApiResponse: (value: ApiResponse) => void
}

const GreenApiContext = createContext<GreenApiContextValue | null>(null)

type GreenApiProviderProps = {
  children: ReactNode
}

export function GreenApiProvider({ children }: GreenApiProviderProps) {
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')

  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    data: null,
    error: null,
    isLoading: false,
  })

  return (
    <GreenApiContext.Provider
      value={{
        idInstance,
        apiTokenInstance,
        setIdInstance,
        setApiTokenInstance,
        apiResponse,
        setApiResponse,
      }}
    >
      {children}
    </GreenApiContext.Provider>
  )
}

export function useGreenApi() {
  const context = useContext(GreenApiContext)

  if (!context) {
    throw new Error('useGreenApi must be used within GreenApiProvider')
  }

  return context
}
