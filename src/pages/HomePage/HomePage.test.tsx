import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  getHttpMocker,
  renderWithProviders,
  updateBrowserURL
} from 'helpers/testsHelpers'

import HomePage from './HomePage'

describe('HomePage', () => {
  const httpMocker = getHttpMocker()

  it('displays top albums', async () => {
    const albumsMock = {
      feed: {
        entry: [
          {
            'im:image': [{ label: 'https://adcd.com/thunderstruck' }],
            title: { label: 'Thunderstruck' },
            id: {
              label: 'id label'
            }
          },
          {
            'im:image': [{ label: 'https://adcd.com/black_in_black' }],
            title: { label: 'Back in Black' },
            id: {
              label: 'id 2 label'
            }
          }
        ]
      }
    }

    httpMocker.mock({
      url: 'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      method: 'get',
      status: 200,
      body: albumsMock
    })
    renderWithProviders(<HomePage />)

    expect(await screen.findByText('Thunderstruck')).toBeVisible()
    expect(await screen.findByText('Back in Black')).toBeVisible()
  })

  it('filter top albums', async () => {
    const albumsMock = {
      feed: {
        entry: [
          {
            'im:image': [{ label: 'https://drake.com/onedance' }],
            title: { label: 'One Dance' },
            id: {
              label: 'id label'
            }
          },
          {
            'im:image': [{ label: 'https://drake.com/hotlinebling' }],
            title: { label: 'Hotline Bling' },
            id: {
              label: 'id 2 label'
            }
          }
        ]
      }
    }

    httpMocker.mock({
      url: 'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      method: 'get',
      status: 200,
      body: albumsMock
    })
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.queryAllByTestId('top-albums-item')).toHaveLength(2)
    })

    userEvent.click(screen.getByLabelText('Search albums'))
    userEvent.keyboard('Hot')

    await waitFor(() => {
      expect(screen.queryAllByTestId('top-albums-item')).toHaveLength(1)
    })

    expect(await screen.findByText('Hotline Bling')).toBeVisible()
  })

  it('filter top albums by search param in URL', async () => {
    const albumsMock = {
      feed: {
        entry: [
          {
            'im:image': [{ label: 'https://drake.com/onedance' }],
            title: { label: 'One Dance' },
            id: {
              label: 'id label'
            }
          },
          {
            'im:image': [{ label: 'https://drake.com/hotlinebling' }],
            title: { label: 'Hotline Bling' },
            id: {
              label: 'id 2 label'
            }
          }
        ]
      }
    }

    httpMocker.mock({
      url: 'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      method: 'get',
      status: 200,
      body: albumsMock
    })

    updateBrowserURL('/?search="hotline"')

    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.queryAllByTestId('top-albums-item')).toHaveLength(1)
    })

    expect(await screen.findByText('Hotline Bling')).toBeVisible()
  })

  it('displays error message when iTunes service is down', async () => {
    httpMocker.mock({
      url: 'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      method: 'get',
      status: 500
    })

    renderWithProviders(<HomePage />)

    expect(
      await screen.findByText('Something went wrong with top albums service :(')
    ).toBeVisible()
  })

  it('displays error message when iTunes service timeout', async () => {
    httpMocker.mock({
      url: 'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      method: 'get',
      delay: 6_000,
      status: 200
    })

    renderWithProviders(<HomePage />)

    expect(
      await screen.findByText(
        'Something went wrong with top albums service :(',
        undefined,
        { timeout: 6_000 }
      )
    ).toBeVisible()
  }, 10_000)

  it.todo('rate albums')
})
