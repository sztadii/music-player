import { render } from '@testing-library/react'
import HttpRequestMock from 'http-request-mock'
import { ReactElement, ReactNode } from 'react'
import { selector, snapshot_UNSTABLE } from 'recoil'

import StoreProvider from 'src/stores/store-provider'

export function updateBrowserURL(url: string) {
  window.history.replaceState(null, '', url)
}

export function getHttpMocker() {
  return HttpRequestMock.setup()
}

// Keep this as a helper function, because in larger applications we have many other providers,
// and we don't want to duplicate this code in each test
export function renderWithProviders(component: ReactElement) {
  return render(<StoreProviderForTesting>{component}</StoreProviderForTesting>)
}

function StoreProviderForTesting(props: { children: ReactNode }) {
  // clearSelectorCachesState looks very ugly, but it is only way to clean the recoil global state
  // https://recoiljs.org/docs/guides/testing#clearing-all-selector-caches
  const clearSelectorCachesState = selector({
    key: 'clearSelectorCaches',
    get: ({ getCallback }) =>
      getCallback(({ snapshot, refresh }) => () => {
        const nodes = snapshot.getNodes_UNSTABLE()
        // @ts-ignore
        for (const node of nodes) {
          refresh(node)
        }
      })
  })

  const snapshot = snapshot_UNSTABLE()
  snapshot.getLoadable(clearSelectorCachesState).getValue()()

  return <StoreProvider>{props.children}</StoreProvider>
}
