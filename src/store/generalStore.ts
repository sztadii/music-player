import { string } from '@recoiljs/refine'
import { atom, useRecoilState } from 'recoil'
import { syncEffect } from 'recoil-sync'

const search = atom<string>({
  key: 'search',
  default: '',
  effects: [syncEffect({ refine: string() })]
})

export const useSearchState = () => useRecoilState(search)
