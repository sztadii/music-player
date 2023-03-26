import axios from 'axios'

const httpService = axios.create({
  timeout: 5000
})

export default httpService
