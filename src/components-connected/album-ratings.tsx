import { Rating } from '@mui/material'
import { useCallback } from 'react'

import { useAlbumRatings } from 'src/hooks/use-album-ratings'

type AlbumRatingsProps = {
  albumId: string
}

export default function AlbumRatings({ albumId }: AlbumRatingsProps) {
  const ratings = useAlbumRatings(state => state.ratings)
  const updateRating = useAlbumRatings(state => state.updateRating)

  const onRatingChange = useCallback(
    (e: unknown, value: number | null) => {
      updateRating(albumId, value)
    },
    [updateRating]
  )

  const ratingValue = ratings[albumId] || 0

  return (
    <div data-testid={`AlbumRatings-${albumId}`}>
      <Rating value={ratingValue} onChange={onRatingChange} />
    </div>
  )
}
