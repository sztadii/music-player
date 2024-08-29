import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useSearchState(): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  const setSearch = useCallback(
    (value: string) => {
      setSearchParams(
        prev => {
          prev.set('search', value)
          return prev
        },
        { replace: true }
      )
    },
    [setSearchParams]
  )

  return [search, setSearch]
}
