import TextField from 'components/text-field'
import debounce from 'lodash/debounce'
import { useCallback } from 'react'
import { useSearchState } from 'stores/general-store'

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
