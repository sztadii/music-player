import React from 'react'
import { selector, useRecoilValue } from 'recoil'
import { findTopAlbums, TopAlbumsResponse } from 'services/musicService'

export default function TopAlbums() {
  const albums = useRecoilValue(fetchAlbums)
  return (
    <div>
      {albums.map(album => {
        return <p key={album.id.label}>{album.title.label}</p>
      })}
    </div>
  )
}

const fetchAlbums = selector<TopAlbumsResponse['feed']['entry']>({
  key: 'fetchAlbums',
  get: async () => {
    const response = await findTopAlbums(10)
    return response.feed.entry
  }
})
