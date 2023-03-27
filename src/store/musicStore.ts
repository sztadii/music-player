import { getFromLocalStorage } from 'helpers/storageHelpers'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { findTopAlbums, TopAlbumsResponse } from 'services/musicService'

const topAlbums = selector<TopAlbumsResponse['feed']['entry']>({
  key: 'topAlbums',
  get: async () => {
    const response = await findTopAlbums(100)
    return response.feed.entry
  }
})

const albumsRatings = atom<Record<string, number>>({
  key: 'albumsRatings',
  default: getFromLocalStorage('albumsRatings') || {}
})

export const useTopAlbums = () => useRecoilValue(topAlbums)

export const useAlbumRatings = () => useRecoilState(albumsRatings)
