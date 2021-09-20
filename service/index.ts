import axios from 'axios'

const service = axios.create({
  baseURL: 'https://virtualsoft.dev.br',
  timeout: 5000,
})

export default service
