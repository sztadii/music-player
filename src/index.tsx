import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { Provider as ReactQueryProvider } from 'src/providers/react-query'
import { Provider as ReactRouterProvider } from 'src/providers/react-router'

import './index.scss'
import reportWebVitals from './report-web-vitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ReactQueryProvider>
      <ReactRouterProvider />
    </ReactQueryProvider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
