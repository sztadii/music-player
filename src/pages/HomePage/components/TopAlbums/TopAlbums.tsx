import {
  Alert,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Rating,
  Skeleton
} from '@mui/material'
import ErrorBoundary from 'components/ErrorBoundary'
import Tooltip from 'components/Tooltip'
import { useMinBreakpoint } from 'helpers/rwdHelpers'
import truncate from 'lodash/truncate'
import { Suspense, useCallback } from 'react'
import { useSearchState } from 'store/generalStore'
import { useAlbumRatings, useTopAlbums } from 'store/musicStore'

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
  // TODO I did not have time to make it perfectly responsive, so I hide some elements
  const isSmallSize = useMinBreakpoint('sm')
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
        const albumId = album.id.label
        const albumTitle = album.title.label
        const titleMaxLength = 40
        return (
          <ListItem
            data-testid="top-albums-item"
            key={albumId}
            disablePadding
            secondaryAction={isSmallSize && <AlbumRatings albumId={albumId} />}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="Avatar img" src={album['im:image'][0].label} />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Tooltip
                    title={albumTitle}
                    disabled={albumTitle.length < titleMaxLength}
                  >
                    {truncate(albumTitle, { length: titleMaxLength })}
                  </Tooltip>
                }
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </div>
  )
}

function TopAlbumsSkeleton() {
  // TODO I did not have time to make it perfectly responsive, so I hide some elements
  const isSmallSize = useMinBreakpoint('sm')
  const items = new Array(10).fill(null).map((_, index) => index)

  return (
    <div>
      {items.map(number => {
        return (
          <ListItem
            key={number}
            disablePadding
            secondaryAction={
              isSmallSize && <Skeleton width={115} height={30} />
            }
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

interface AlbumRatingsProps {
  albumId: string
}

function AlbumRatings(props: AlbumRatingsProps) {
  const { albumId } = props
  const [ratings, setRatings] = useAlbumRatings()

  const updateRatings = useCallback((e: unknown, value: number | null) => {
    setRatings({
      ...ratings,
      [albumId]: value || 0
    })
  }, [])

  return <Rating value={ratings[albumId]} onChange={updateRatings} />
}
