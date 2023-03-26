import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('displays top albums heading', () => {
    render(<HomePage />)
    expect(screen.getByText('Top albums')).toBeVisible()
  })
})
