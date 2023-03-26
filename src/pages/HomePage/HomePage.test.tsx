import { screen } from '@testing-library/react'
import { renderWithProviders } from 'helpers/testsHelpers'
import React from 'react'

import HomePage from './HomePage'

describe('HomePage', () => {
  it('displays top albums heading', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('Top albums')).toBeVisible()
  })
})
