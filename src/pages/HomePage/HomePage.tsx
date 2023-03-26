import React from 'react'
import { Typography, TextField, Box, Divider, Container } from '@mui/material'
import { useSearchState } from 'store/generalStore'
import TopAlbums from './components/TopAlbums'
import styles from './HomePage.module.scss'

export default function HomePage() {
  const [search, setSearch] = useSearchState()
  return (
    <Container className={styles.wrapper} sx={{ my: 4 }}>
      <Typography variant="h3" mb={3}>
        Top albums
      </Typography>

      <Box mb={3}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <TopAlbums />
    </Container>
  )
}
