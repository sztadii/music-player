import { Rating } from '@mui/material'
import { useCallback } from 'react'
import { useAlbumRatings } from 'stores/music-store'

interface AlbumRatingsProps {
  albumId: string
}

export default function AlbumRatings(props: AlbumRatingsProps) {
  const { albumId } = props
  const [ratings, setRatings] = useAlbumRatings()

  const updateRatings = useCallback(
    (e: unknown, value: number | null) => {
      const newRatings = { ...ratings, [albumId]: value }
      setRatings(newRatings)
    },
    [ratings]
  )

  return (
    <div data-testid={`AlbumRatings-${albumId}`}>
      <Rating value={ratings[albumId]} onChange={updateRatings} />
    </div>
  )
}
