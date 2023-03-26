import React, { Suspense } from 'react'
import { Typography, Alert } from '@mui/material'
import ErrorBoundary from 'components/ErrorBoundary'
import SkeletonTextList from 'components/SkeletonTextList'
import TopAlbums from './components/TopAlbums'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h3" mb={2}>
        Top albums
      </Typography>

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
