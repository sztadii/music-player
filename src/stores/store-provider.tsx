import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { RecoilURLSyncJSON } from 'recoil-sync'

interface StoreProviderProps {
  children: ReactNode
}

export default function StoreProvider(props: StoreProviderProps) {
  return (
    <RecoilRoot>
      <RecoilURLSyncJSON location={{ part: 'queryParams' }}>
        {props.children}
      </RecoilURLSyncJSON>
    </RecoilRoot>
  )
}
