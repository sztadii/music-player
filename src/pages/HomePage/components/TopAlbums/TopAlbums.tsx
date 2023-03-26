import React, { Suspense } from 'react'
import {
  ListItem,
  Rating,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Skeleton,
  Alert
} from '@mui/material'
import ErrorBoundary from 'components/ErrorBoundary'
import { useTopAlbums } from 'store/musicStore'
import { useSearchState } from 'store/generalStore'

export default function TopAlbums() {
  return (
    <ErrorBoundary
      fallback={
        <Alert severity="error">
          Something went wrong with top albums service :(
        </Alert>
      }
    >
      <Suspense fallback={<TopAlbumsSkeleton />}>
        <TopAlbumsContent />
      </Suspense>
    </ErrorBoundary>
  )
}

function TopAlbumsContent() {
  const albums = useTopAlbums()
  const [search] = useSearchState()

  const filteredAlbums = search
    ? albums.filter(album =>
        album.title.label.toLowerCase().includes(search.toLowerCase())
      )
    : albums

  if (!filteredAlbums.length) {
    return <div>No results</div>
  }

  return (
    <div>
      {filteredAlbums.map(album => {
        const id = album.id.label
        const albumTitle = album.title.label
        return (
          <ListItem
            key={id}
            secondaryAction={
              <Rating name="simple-controlled" value={0} onChange={() => {}} />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="Avatar img" src={album['im:image'][0].label} />
              </ListItemAvatar>
              <ListItemText primary={albumTitle} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </div>
  )
}

function TopAlbumsSkeleton() {
  const items = new Array(10).fill(null).map((_, index) => index)

  return (
    <div>
      {items.map(number => {
        return (
          <ListItem
            key={number}
            secondaryAction={<Skeleton width={115} height={30} />}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <Skeleton variant="text" width={200} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </div>
  )
}
