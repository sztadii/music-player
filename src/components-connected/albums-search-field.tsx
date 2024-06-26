import debounce from 'lodash/debounce'
import { useCallback } from 'react'

import TextField from 'src/components/text-field'
import { useSearchState } from 'src/stores/general-store'

export default function AlbumsSearchField() {
  const [search, setSearch] = useSearchState()

  const debouncedSetSearch = useCallback(
    debounce(value => {
      setSearch(value)
    }, 500),
    []
  )

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
