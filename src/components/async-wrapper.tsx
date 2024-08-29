import { ReactNode, Suspense } from 'react'

import ErrorBoundary from 'src/components/error-boundary'

type AsyncWrapperProps = {
  loading: ReactNode
  error: ReactNode
  children: ReactNode
}

export default function AsyncWrapper({
  error,
  loading,
  children
}: AsyncWrapperProps) {
  return (
    <ErrorBoundary fallback={error}>
      <Suspense fallback={loading}>{children}</Suspense>
    </ErrorBoundary>
  )
}
