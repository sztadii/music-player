import isNull from 'lodash/isNull'
import omitBy from 'lodash/omitBy'
import { create } from 'zustand'

import {
  getFromLocalStorage,
  setToLocalStorage
} from 'src/helpers/storage-helpers'

type RatingValue = number | null

type AlbumRatingsStore = {
  ratings: Record<string, RatingValue>
  updateRating: (id: string, value: RatingValue) => void
}

export const useAlbumRatings = create<AlbumRatingsStore>((set, get) => ({
  ratings: getFromLocalStorage('albumsRatings') || {},
  updateRating: (id, value) => {
    const { ratings } = get()
    const newRatings = { ...ratings, [id]: value }

    set({
      ratings: newRatings
    })

    // No need to save unselected ratings in localStorage
    // localStorage has 5MB limit, so let's keep it small
    const ratingsWithoutNull = omitBy(newRatings, isNull)
    setToLocalStorage('albumsRatings', ratingsWithoutNull)
  }
}))
