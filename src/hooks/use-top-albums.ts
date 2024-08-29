import { useSuspenseQuery } from '@tanstack/react-query'

import { findTopAlbums } from 'src/services/music-service'

export function useTopAlbums() {
  return useSuspenseQuery({
    queryKey: ['top-albums'],
    queryFn: async () => {
      const response = await findTopAlbums(100)
      return response.feed.entry
    }
  })
}
