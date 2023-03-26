import { atom, useRecoilState } from 'recoil'

const search = atom<string>({
  key: 'search',
  default: ''
})

export const useSearchState = () => useRecoilState(search)
