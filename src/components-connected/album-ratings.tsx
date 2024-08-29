import { Rating } from '@mui/material'
import { useCallback } from 'react'

import { useAlbumRatings } from 'src/hooks/use-album-ratings'

type AlbumRatingsProps = {
  albumId: string
}

export default function AlbumRatings(props: AlbumRatingsProps) {
  const { albumId } = props
  const rating = useAlbumRatings(state => state.ratings[albumId])
  const updateRating = useAlbumRatings(state => state.updateRating)

  const onRatingChange = useCallback(
    (e: unknown, value: number | null) => {
      updateRating(albumId, value)
    },
    [updateRating]
  )

  return (
    <div data-testid={`AlbumRatings-${albumId}`}>
      <Rating value={rating || 0} onChange={onRatingChange} />
    </div>
  )
}
