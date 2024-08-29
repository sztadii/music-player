import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

const paramName = 'search'

export function useSearchState(): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get(paramName) || ''

  const setSearch = useCallback(
    (value: string) => {
      setSearchParams(
        prev => {
          prev.set(paramName, value.trim())

          if (!value) prev.delete(paramName)

          return prev
        },
        { replace: true }
      )
    },
    [setSearchParams]
  )

  return [search, setSearch]
}
