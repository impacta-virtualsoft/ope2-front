import axios from 'axios'
import { BACKEND_URL } from '~/helpers/env'

const service = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
})

export default service
