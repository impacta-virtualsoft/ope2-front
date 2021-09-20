import jwtDecode from 'jwt-decode'
import { API_REQUEST_HEADERS } from '~/helpers/constants'
import { API_URL, BACKEND_URL, LOGIN_PATH, USER_PATH } from '~/helpers/env'
import { service } from '~/service'

const LOGIN_URL = BACKEND_URL! + LOGIN_PATH!
const USERS_URL = API_URL! + USER_PATH

type GetTokenType = {
  email: string
  password: string
}
async function getLoginToken(data: GetTokenType) {
  const config = { headers: API_REQUEST_HEADERS }
  try {
    const req = await service.post(LOGIN_URL, data, config)
    return req
  } catch (err) {
    console.error(err)
  }
}

type GetUserType = {
  token: string
}
async function getLoginUser({ token }: GetUserType) {
  try {
    const decodedToken: DecodedTokenType = jwtDecode(token)
    const res = await service({
      method: 'GET',
      url: USERS_URL + decodedToken.user_id,
      headers: {
        ...API_REQUEST_HEADERS,
        Authorization: 'jwt ' + token,
      },
    })
    return res.data as UserType
  } catch (err) {
    console.error(err)
  }
}

export { getLoginToken, getLoginUser }
