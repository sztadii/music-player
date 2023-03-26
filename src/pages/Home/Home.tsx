import React, { Suspense } from 'react'
import { Skeleton, Typography } from '@mui/material'
import TopAlbums from './TopAlbums'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h3" mb={2}>
        Top albums
      </Typography>

      <Suspense
        fallback={
          <div>
            {new Array(10).fill(null).map((_, index) => {
              return <Skeleton key={index} width={300} variant="text" />
            })}
          </div>
        }
      >
        <TopAlbums />
      </Suspense>
    </div>
  )
}
