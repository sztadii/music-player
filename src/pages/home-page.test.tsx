import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { getFromLocalStorage } from 'src/helpers/storage-helpers'
import { renderWithProviders } from 'src/helpers/tests-helpers'
import { TopAlbumsResponse, findTopAlbums } from 'src/services/music-service'

jest.mock('src/services/music-service')

describe('HomePage', () => {
  const mockFindTopAlbums = findTopAlbums as jest.MockedFunction<
    typeof findTopAlbums
  >

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('displays top albums', async () => {
    const albumsMock: DeepPartial<TopAlbumsResponse> = {
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

    mockFindTopAlbums.mockResolvedValue(albumsMock as TopAlbumsResponse)
    renderWithProviders({
      initialEntries: ['/']
    })

    expect(await screen.findByText('Thunderstruck')).toBeVisible()
    expect(await screen.findByText('Back in Black')).toBeVisible()
  })

  it('filter top albums', async () => {
    const albumsMock: DeepPartial<TopAlbumsResponse> = {
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

    mockFindTopAlbums.mockResolvedValue(albumsMock as TopAlbumsResponse)
    renderWithProviders({
      initialEntries: ['/']
    })

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
    const albumsMock: DeepPartial<TopAlbumsResponse> = {
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

    mockFindTopAlbums.mockResolvedValue(albumsMock as TopAlbumsResponse)

    renderWithProviders({
      initialEntries: ['/?search=hotline']
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId('top-albums-item')).toHaveLength(1)
    })

    expect(await screen.findByText('Hotline Bling')).toBeVisible()
  })

  it('displays error message when iTunes service is down', async () => {
    mockFindTopAlbums.mockRejectedValue(new Error('Service unavailable'))

    renderWithProviders({
      initialEntries: ['/']
    })

    expect(
      await screen.findByText('Something went wrong with top albums service :(')
    ).toBeVisible()
  })

  it('rate albums', async () => {
    const albumsMock: DeepPartial<TopAlbumsResponse> = {
      feed: {
        entry: [
          {
            'im:image': [{ label: 'https://rihanna.com/umbrella' }],
            title: { label: 'Umbrella' },
            id: {
              label: 'umbrella-id'
            }
          },
          {
            'im:image': [{ label: 'https://rihanna.com/fire' }],
            title: { label: 'Fire' },
            id: {
              label: 'fire-id'
            }
          }
        ]
      }
    }

    mockFindTopAlbums.mockResolvedValue(albumsMock as TopAlbumsResponse)

    renderWithProviders({
      initialEntries: ['/']
    })

    const firstAlbumRating = await screen.findByTestId(
      'AlbumRatings-umbrella-id'
    )
    const secondAlbumRating = await screen.findByTestId('AlbumRatings-fire-id')

    userEvent.click(within(firstAlbumRating).getByText('2 Stars'))
    expect(getFromLocalStorage('albumsRatings')).toEqual({ 'umbrella-id': 2 })

    userEvent.click(within(firstAlbumRating).getByText('5 Stars'))
    expect(getFromLocalStorage('albumsRatings')).toEqual({ 'umbrella-id': 5 })

    userEvent.click(within(secondAlbumRating).getByText('3 Stars'))
    expect(getFromLocalStorage('albumsRatings')).toEqual({
      'fire-id': 3,
      'umbrella-id': 5
    })

    // TODO Find a way to un-click the same star to remove rating
    // userEvent.click(within(secondAlbumRating).getByText('3 Stars'))
    //
    // await waitFor(() => {
    //   expect(getFromLocalStorage('albumsRatings')).toEqual({
    //     'umbrella-id': 5
    //   })
    // })
  })
})
