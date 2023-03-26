import { useCallback } from 'react'
import { TextField } from '@mui/material'
import debounce from 'lodash/debounce'
import { useSearchState } from 'store/generalStore'

export default function AlbumsSearchField() {
  const [, setSearch] = useSearchState()

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
      onChange={e => {
        debouncedSetSearch(e.target.value)
      }}
    />
  )
}
