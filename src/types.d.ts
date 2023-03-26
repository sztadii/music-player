// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: number
    retryDelay?: number
  }
}
