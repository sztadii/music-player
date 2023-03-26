import { selector, useRecoilValue } from 'recoil'
import { findTopAlbums, TopAlbumsResponse } from 'services/musicService'

const topAlbums = selector<TopAlbumsResponse['feed']['entry']>({
  key: 'topAlbums',
  get: async () => {
    const response = await findTopAlbums(100)
    return response.feed.entry
  }
})

export const useTopAlbums = () => useRecoilValue(topAlbums)
