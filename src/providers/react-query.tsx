import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useMemo } from 'react'

export function Provider({ children }: { children: ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0
          }
        }
      }),
    []
  )
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
