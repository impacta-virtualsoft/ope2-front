import jwtDecode from 'jwt-decode'
import { API_REQUEST_HEADERS } from '~/helpers/constants'
import { API_URL, USER_PATH } from '~/helpers/env'
import service from '~/service'

const USERS_URL = API_URL! + USER_PATH

type GetUserType = {
  token: string
}
async function getUser({ token }: GetUserType) {
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

export { getUser }
