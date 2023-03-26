import 'assets/styles/index.scss'

import HomePage from 'pages/HomePage'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <RecoilRoot>
      <HomePage />
    </RecoilRoot>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
