import { getFromLocalStorage, setToLocalStorage } from 'helpers/storageHelpers'
import isNull from 'lodash/isNull'
import omitBy from 'lodash/omitBy'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { findTopAlbums, TopAlbumsResponse } from 'services/musicService'

const topAlbums = selector<TopAlbumsResponse['feed']['entry']>({
  key: 'topAlbums',
  get: async () => {
    const response = await findTopAlbums(100)
    return response.feed.entry
  }
})

const albumsRatings = atom<Record<string, number | null>>({
  key: 'albumsRatings',
  default: getFromLocalStorage('albumsRatings') || {},
  effects: [
    ({ onSet }) => {
      onSet(albumsRatings => {
        const albumsWithNonNullValues = omitBy(albumsRatings, isNull)
        setToLocalStorage('albumsRatings', albumsWithNonNullValues)
      })
    }
  ]
})

export const useTopAlbums = () => useRecoilValue(topAlbums)

export const useAlbumRatings = () => useRecoilState(albumsRatings)
