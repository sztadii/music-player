import { render } from '@testing-library/react'
import HttpRequestMock from 'http-request-mock'

import { Provider as ReactQueryProvider } from 'src/providers/react-query'
import {
  CreateRouterForTestingOptions,
  createRouterForTesting
} from 'src/providers/react-router'

export function getHttpMocker() {
  return HttpRequestMock.setup()
}

// Keep this as a helper function, because in larger applications we have many other providers,
// and we don't want to duplicate this code in each test
export function renderWithProviders(opts?: CreateRouterForTestingOptions) {
  const router = createRouterForTesting(opts)
  return render(<ReactQueryProvider>{router}</ReactQueryProvider>)
}
