import { TextField } from '@mui/material'
import { useSearchState } from 'store/generalStore'

export default function AlbumsSearchField() {
  const [search, setSearch] = useSearchState()
  return (
    <TextField
      fullWidth
      label="Search"
      variant="outlined"
      value={search}
      onChange={e => {
        setSearch(e.target.value)
      }}
    />
  )
}
