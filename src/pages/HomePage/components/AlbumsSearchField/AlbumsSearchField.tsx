import { TextField } from '@mui/material'
import debounce from 'lodash/debounce'
import { useCallback } from 'react'
import { useSearchState } from 'store/generalStore'

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
      label="Search"
      variant="outlined"
      defaultValue={search}
      onChange={e => {
        debouncedSetSearch(e.target.value)
      }}
    />
  )
}
