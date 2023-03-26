import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { findTopAlbums, TopAlbumsResponse } from 'services/musicService'

const topAlbums = selector<TopAlbumsResponse['feed']['entry']>({
  key: 'topAlbums',
  get: async () => {
    const response = await findTopAlbums(100)
    return response.feed.entry
  }
})

type AlbumRatings = Record<string, number>

const albumsRatings = atom<AlbumRatings>({
  key: 'albumsRatings',
  default: {}
})

export const useTopAlbums = () => useRecoilValue(topAlbums)

export const useAlbumRatings = () => useRecoilState(albumsRatings)
