import React, { Suspense } from 'react'
import { Typography } from '@mui/material'
import SkeletonTextList from 'components/SkeletonTextList'
import TopAlbums from './components/TopAlbums'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h3" mb={2}>
        Top albums
      </Typography>

      <Suspense fallback={<SkeletonTextList length={10} width={300} />}>
        <TopAlbums />
      </Suspense>
    </div>
  )
}
