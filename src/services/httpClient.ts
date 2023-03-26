import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 3, retryDelay: () => 1000 })

export default axios
