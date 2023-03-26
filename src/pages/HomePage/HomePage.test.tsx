import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'helpers/testsHelpers'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import HomePage from './HomePage'

describe('HomePage', () => {
  let server: ReturnType<typeof setupServer>

  beforeAll(() => {
    server = setupServer()
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('displays top albums from iTunes', async () => {
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

    server.use(
      rest.get(
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(albumsMock))
        }
      )
    )
    renderWithProviders(<HomePage />)

    expect(await screen.findByText('Thunderstruck')).toBeVisible()
    expect(await screen.findByText('Back in Black')).toBeVisible()
  })

  it('filter top albums from iTunes', async () => {
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

    server.use(
      rest.get(
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(albumsMock))
        }
      )
    )
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.queryAllByTestId('top-albums-item')).toHaveLength(2)
    })

    userEvent.click(screen.getByLabelText('Search'))
    userEvent.keyboard('Back')

    await waitFor(() => {
      expect(screen.queryAllByTestId('top-albums-item')).toHaveLength(1)
    })

    expect(await screen.findByText('Back in Black')).toBeVisible()
  })

  it('displays error message when iTunes service is unavailable', async () => {
    server.use(
      rest.get(
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
        (req, res, ctx) => {
          return res(ctx.status(500))
        }
      )
    )

    renderWithProviders(<HomePage />)

    expect(
      await screen.findByText('Something went wrong with top albums service :(')
    ).toBeVisible()
  })
})
