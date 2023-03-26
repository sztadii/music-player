import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { ReactElement } from 'react'

// Keep this as a helper function, because in larger applications we have many other providers,
// and we don't want to duplicate this code in each test
export function renderWithProviders(element: ReactElement) {
  return render(<RecoilRoot>{element}</RecoilRoot>)
}
