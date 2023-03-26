import React from 'react'
import { useTopAlbums } from 'store/musicStore'
import { useSearchState } from 'store/generalStore'

export default function TopAlbums() {
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
        return <p key={album.id.label}>{album.title.label}</p>
      })}
    </div>
  )
}
