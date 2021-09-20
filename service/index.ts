import axios from 'axios'
import { getSession } from 'next-auth/react'
import { API_REQUEST_HEADERS } from '~/helpers/constants'
import { BACKEND_URL } from '~/helpers/env'

const makeToken = async () => {
  const session = await getSession()
  return session?.accessToken
}
const publicService = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
})
const service = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: {
    ...API_REQUEST_HEADERS,
    Authorization: 'jwt ' + makeToken(),
  },
})

export { publicService, service }
