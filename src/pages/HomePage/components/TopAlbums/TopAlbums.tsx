import React from 'react'
import { useTopAlbums } from 'store/musicStore'

export default function TopAlbums() {
  const albums = useTopAlbums()
  return (
    <div>
      {albums.map(album => {
        return <p key={album.id.label}>{album.title.label}</p>
      })}
    </div>
  )
}
