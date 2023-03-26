import React, { Suspense } from 'react'
import { Typography, Alert, TextField, Box, Divider } from '@mui/material'
import ErrorBoundary from 'components/ErrorBoundary'
import SkeletonTextList from 'components/SkeletonTextList'
import { useSearchState } from 'store/generalStore'
import TopAlbums from './components/TopAlbums'
import styles from './HomePage.module.scss'

export default function HomePage() {
  const [search, setSearch] = useSearchState()
  return (
    <div className={styles.wrapper}>
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

      <ErrorBoundary
        fallback={
          <Alert severity="error">
            Something went wrong with top albums service :(
          </Alert>
        }
      >
        <Suspense fallback={<SkeletonTextList length={10} width={400} />}>
          <TopAlbums />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
