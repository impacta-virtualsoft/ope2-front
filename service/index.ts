import axios from 'axios'
import { getSession } from 'next-auth/react'
import { BACKEND_URL } from '~/helpers/env'

const makeToken = () => {
  const session = getSession()
  console.log()
}
const publicService = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
})
const service = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
})

export default service
