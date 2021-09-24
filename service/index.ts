import axios from 'axios'
import { getSession } from 'next-auth/react'
import { API_REQUEST_HEADERS } from '~/helpers/constants'
import { BACKEND_URL } from '~/helpers/env'

const service = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: API_REQUEST_HEADERS,
})

// Add a request interceptor
service.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const session = await getSession()
    if (session) {
      // console.log('==> interceptor')
      // console.log({ session })
      // console.log({ config })
      // console.log('==> FIM DO interceptor')
      config.headers = {
        ...config.headers,
        Authorization: 'jwt ' + session.accessToken,
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export { service }
