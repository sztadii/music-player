import {
  Alert,
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material'
import { grey } from '@mui/material/colors'
import ErrorBoundary from 'components/ErrorBoundary'
import Tooltip from 'components/Tooltip'
import { useMinBreakpoint } from 'helpers/rwdHelpers'
import truncate from 'lodash/truncate'
import { Suspense } from 'react'
import { useSearchState } from 'store/generalStore'
import { useTopAlbums } from 'store/musicStore'

import AlbumRatings from '../AlbumRatings'

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
  const isBiggerThanSmDevice = useMinBreakpoint('sm')
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
        const titleMaxLength = isBiggerThanSmDevice ? 40 : 25
        return (
          <ListItem
            data-testid="top-albums-item"
            key={albumId}
            disablePadding
            secondaryAction={
              <div
                style={{ display: isBiggerThanSmDevice ? undefined : 'none' }}
              >
                <AlbumRatings albumId={albumId} />
              </div>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: grey[300] }}
                  alt="Avatar img"
                  src={album['im:image'][0].label}
                />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Tooltip
                    title={albumTitle}
                    disabled={
                      isBiggerThanSmDevice
                        ? albumTitle.length < titleMaxLength
                        : false
                    }
                    disablePortal
                  >
                    {isBiggerThanSmDevice ? (
                      truncate(albumTitle, { length: titleMaxLength })
                    ) : (
                      <Typography noWrap>{albumTitle}</Typography>
                    )}
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
  const isBiggerThanSmDevice = useMinBreakpoint('sm')
  const items = new Array(10).fill(null).map((_, index) => index)

  return (
    <div>
      {items.map(number => {
        const randomisedSkeletonTextWidth = Math.random() > 0.5 ? 220 : 160
        return (
          <ListItem
            key={number}
            disablePadding
            secondaryAction={
              isBiggerThanSmDevice && (
                <Box display="flex" alignItems="center" gap={0.7}>
                  {new Array(5).fill(null).map(() => (
                    <Skeleton variant="circular" width={19} height={19} />
                  ))}
                </Box>
              )
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <Skeleton variant="text" width={randomisedSkeletonTextWidth} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </div>
  )
}
