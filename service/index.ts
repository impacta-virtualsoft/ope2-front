import axios from 'axios'
import { API_REQUEST_HEADERS } from '~/helpers/constants'
import { BACKEND_URL } from '~/helpers/envs'
import { getToken } from './login'

async function getSession() {
  // console.log('Implementar getSession()')
  return getToken()
}

const service = axios.create({
  baseURL: BACKEND_URL,
  // timeout: 1000,
  headers: API_REQUEST_HEADERS,
})

// Add a request interceptor
service.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const session = await getSession()
    console.log('==> INTERCEPTOR')
    console.log({ session })
    console.log({ config })
    // if (session && session.accessToken) {
    if (session && session.access) {
      config.headers = {
        ...config.headers,
        // Authorization: 'Bearer ' + session.accessToken,
        Authorization: 'Bearer ' + session.access,
      }
    }
    console.log({ config })

    return config
  },

  async (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

export { service }
