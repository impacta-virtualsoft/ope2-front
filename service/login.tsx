import { API_REQUEST_HEADERS } from '~/helpers/constants'
import { BACKEND_URL, LOGIN_PATH } from '~/helpers/env'
import service from '~/service'

const LOGIN_URL = BACKEND_URL! + LOGIN_PATH!

type LoginDataType = {
  username: string
  password: string
}
async function login(data: LoginDataType) {
  console.log({ LOGIN_URL })
  const config = { headers: API_REQUEST_HEADERS }
  try {
    const req = await service.post(LOGIN_URL, data, config)
    return req
  } catch (err) {
    console.error(err)
  }
}

export default login
