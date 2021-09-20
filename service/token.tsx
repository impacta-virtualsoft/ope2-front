import { API_REQUEST_HEADERS } from '~/helpers/constants'
import { BACKEND_URL, LOGIN_PATH } from '~/helpers/env'
import service from '~/service'

const LOGIN_URL = BACKEND_URL! + LOGIN_PATH!

type GetTokenType = {
  email: string
  password: string
}
async function getToken(data: GetTokenType) {
  console.log({ LOGIN_URL })
  const config = { headers: API_REQUEST_HEADERS }
  try {
    const req = await service.post(LOGIN_URL, data, config)
    return req
  } catch (err) {
    console.error(err)
  }
}

export { getToken }
