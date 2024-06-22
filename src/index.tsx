import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import HomePage from 'src/pages/home-page'

import './index.scss'
import reportWebVitals from './report-web-vitals'
import StoreProvider from './stores/store-provider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <StoreProvider>
      <HomePage />
    </StoreProvider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
