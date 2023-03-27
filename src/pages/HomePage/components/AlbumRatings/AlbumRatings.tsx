import { Rating } from '@mui/material'
import { setToLocalStorage } from 'helpers/storageHelpers'
import omit from 'lodash/omit'
import { useCallback } from 'react'
import { useAlbumRatings } from 'store/musicStore'

interface AlbumRatingsProps {
  albumId: string
}

export default function AlbumRatings(props: AlbumRatingsProps) {
  const { albumId } = props
  const [ratings, setRatings] = useAlbumRatings()

  const updateRatings = useCallback(
    (e: unknown, value: number | null) => {
      const newRatings = value
        ? { ...ratings, [albumId]: value }
        : omit(ratings, [albumId])

      setRatings(newRatings)
      setToLocalStorage('albumsRatings', newRatings)
    },
    [ratings]
  )

  return (
    <div data-testid={`AlbumRatings-${albumId}`}>
      <Rating value={ratings[albumId]} onChange={updateRatings} />
    </div>
  )
}
