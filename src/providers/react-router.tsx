import type { Router as RemixRouter } from '@remix-run/router/dist/router'
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter
} from 'react-router-dom'

import HomePage from 'src/pages/home-page'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  }
]

const routerDefault = createBrowserRouter(routes)

export function Provider({ router = routerDefault }: { router?: RemixRouter }) {
  return <RouterProvider router={router} />
}

export type CreateRouterForTestingOptions = Parameters<
  typeof createMemoryRouter
>[1]

export function createRouterForTesting(opts?: CreateRouterForTestingOptions) {
  const routerForTesting = createMemoryRouter(routes, opts)
  return <Provider router={routerForTesting} />
}
