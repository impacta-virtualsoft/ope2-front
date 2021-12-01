import axios from 'axios'
import { getSession } from 'next-auth/react'
import { API_REQUEST_HEADERS } from '~/helpers/constants'
import { BACKEND_URL } from '~/helpers/envs'

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
    // console.log('==> INTERCEPTOR')
    // console.log({ session })
    // console.log({ config })
    if (session && session.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + session.accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    }
    return config
  },
  async (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

export { service }
