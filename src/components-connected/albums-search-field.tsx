import debounce from 'lodash/debounce'
import { useCallback } from 'react'

import TextField from 'src/components/text-field'
import { useSearchState } from 'src/hooks/use-search-state'

export default function AlbumsSearchField() {
  const [search, setSearch] = useSearchState()

  const debouncedSetSearch = useCallback(debounce(setSearch, 500), [])

  return (
    <TextField
      fullWidth
      label="Search albums"
      defaultValue={search}
      onChange={e => {
        debouncedSetSearch(e.target.value)
      }}
    />
  )
}
