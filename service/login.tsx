import { AxiosResponse } from 'axios'
import jwtDecode from 'jwt-decode'
import { LOGIN_URL, REFRESHTOKEN_URL, USERS_URL } from '~/helpers/constants'
import { service } from '~/service'

function decodeToken(token: string) {
  const decodedToken: DecodedTokenType = jwtDecode(token)
  return decodedToken
}

async function getLoginToken(data: CredentialRequestType) {
  const config = {} /*{ headers: API_REQUEST_HEADERS }*/
  try {
    const req = await service.post(LOGIN_URL, data, config)
    return req.data as TokenType
  } catch (err) {
    console.error('Erro em getLoginToken')
    throw new Error()
  }
}

async function getLoginUser({ access }: TokenType) {
  try {
    const decodedToken = decodeToken(access)
    const req = await service({
      method: 'GET',
      url: `${USERS_URL}/${decodedToken.user_id}`,
      headers: {
        // ...API_REQUEST_HEADERS,
        Authorization: 'Bearer ' + access,
      },
    })
    return req.data as UserType
  } catch (err) {
    console.error('Erro em getLoginUser')
    throw new Error()
  }
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: GenericObject<unknown>) {
  try {
    const config = {}
    const data = { refresh: token.refreshToken }
    const getRefreshToken: AxiosResponse<
      Pick<TokenType, 'access'>,
      any
    > = await service.post(REFRESHTOKEN_URL, data, config)
    const refreshedToken = getRefreshToken.data
    const decodedRefreshedToken = decodeToken(refreshedToken.access)

    const accessToken = refreshedToken.access ?? token.accessToken
    const accessTokenExpires = decodedRefreshedToken.exp * 1000

    const response = {
      ...token,
      accessToken,
      accessTokenExpires,
    }

    return response
  } catch (error) {
    console.log('Erro em refreshAccessToken')

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export { decodeToken, getLoginToken, getLoginUser, refreshAccessToken }
