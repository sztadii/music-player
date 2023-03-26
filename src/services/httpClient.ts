import axios from 'axios'

// axios-retry was throwing weird errors, then I decided to use own handler
function handleRetry(err: any) {
  const { config, message } = err

  if (!config || !config.retry) {
    return Promise.reject(err)
  }

  // retry while Network timeout or Network Error
  if (!(message.includes('timeout') || message.includes('Network Error'))) {
    return Promise.reject(err)
  }
  config.retry -= 1

  const delayRetryRequest = new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, config.retryDelay || 1000)
  })

  return delayRetryRequest.then(() => axios(config))
}

axios.interceptors.response.use(undefined, handleRetry)

export default axios
