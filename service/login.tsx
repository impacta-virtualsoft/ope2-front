import { AxiosResponse } from 'axios'
import jwt_decode from 'jwt-decode'
import { makeUrl } from '~/helpers/constants'
import { LOGIN_PATH, REFRESHTOKEN_PATH, USER_PATH } from '~/helpers/envs'
import { service } from '~/service'

function decodeToken(token: string) {
  const decodedToken: DecodedTokenType = jwt_decode(token)
  return decodedToken
}

async function getLoginToken(data: CredentialRequestType) {
  const config = {} /*{ headers: API_REQUEST_HEADERS }*/
  try {
    const loginUrl = makeUrl(LOGIN_PATH, true)
    const req = await service.post(loginUrl, data, config)
    return req.data as TokenType
  } catch (err) {
    console.error('Erro em getLoginToken')
    throw new Error()
  }
}

async function getLoginUser({ access }: TokenType) {
  const userUrl = makeUrl(USER_PATH)
  const decodedToken = decodeToken(access)
  console.log({ decodedToken })
  console.log(`${userUrl}/${decodedToken.user_id}`)
  try {
    const req = await service({
      method: 'GET',
      url: `${userUrl}/${decodedToken.user_id}`,
      headers: {
        // ...API_REQUEST_HEADERS,
        Authorization: 'Bearer ' + access,
      },
    })
    console.log('getLoginUser data')
    console.log(req.data)
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
  const refreshTokenUrl = makeUrl(REFRESHTOKEN_PATH, true)
  try {
    const config = {}
    const data = { refresh: token.refreshToken }
    const getRefreshToken: AxiosResponse<
      Pick<TokenType, 'access'>,
      any
    > = await service.post(refreshTokenUrl, data, config)
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
