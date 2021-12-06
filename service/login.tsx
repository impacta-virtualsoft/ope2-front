import { AxiosResponse } from 'axios'
import jwt_decode from 'jwt-decode'
import { makeUrl } from '~/helpers/constants'
import { LOGIN_PATH, REFRESHTOKEN_PATH, USER_PATH } from '~/helpers/envs'
import { service } from '~/service'

function decodeToken(token: string) {
  console.log({ token })
  const decodedToken: DecodedTokenType = jwt_decode(token)
  return decodedToken
}

export async function runLogin(data: CredentialRequestType) {
  try {
    const tokenStored = getToken()
    if (!tokenStored) {
      const reqLogin = await getLoginToken(data)
      saveToken(reqLogin)
    }
    document.location.href = '/'
  } catch {
    throw new Error('Não foi possível logar')
  }
}

async function getLoginToken(data: CredentialRequestType) {
  // let pass = false
  // if (
  //   (data.email === 'backend@virtualsoft.dev.br' &&
  //     data.password === 'backend@backend') ||
  //   (data.email === 'frontend@virtualsoft.dev.br' &&
  //     data.password === 'frontend@frontend')
  // ) {
  //   pass = true
  // }
  // if (pass) {
  //   const responseData = {
  //     access:
  //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM4ODIxODM3LCJqdGkiOiJlYzBlMDkxMjU1Mjk0M2U4YmUzZjMwYjVmYTI2OTFiNiIsInVzZXJfaWQiOjF9.XdXUWJDwCRSnyJRGL-LyoH_9jGbLpVZ3w_PrB0M0Gdk',
  //     refresh:
  //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0MTMyNzQzNywianRpIjoiMzEwYjJhNzQwM2ZkNGUwZmJmMWZiOWY4NDUzZGRlN2QiLCJ1c2VyX2lkIjoxfQ.WyAdLZEpCiZkp8RfDy0Mr86JKV-LqCMHXrk7MpxTITE',
  //   }
  //   saveToken(responseData)
  //   return responseData
  // } else {
  //   throw new Error('Usuário não encontrado!')
  // }
  try {
    const loginUrl = makeUrl(LOGIN_PATH, true)
    const req = await service.post(loginUrl, data)
    saveToken(req.data)
    return req.data as TokenType
  } catch (err) {
    console.error('Erro em getLoginToken')
    throw new Error()
  }
}

export function saveToken(tokenData: TokenType) {
  if (!window) throw new Error('Essa função roda apenas no client')

  localStorage.setItem('token', JSON.stringify(tokenData))
}

export function getToken() {
  const tokenReq = localStorage.getItem('token')
  try {
    const tokenData = tokenReq ? JSON.parse(tokenReq) : ''
    return tokenData as TokenType
  } catch (err) {
    console.error(err)
    throw new Error(JSON.stringify(err))
  }
}

export function removeToken() {
  localStorage.removeItem('token')
}

export async function isTokenValid() {
  const token = getToken()
  if (!!Object.keys(token).length) {
    const hasMadeLogin = await getLoginUser(token)
    if (!!Object.keys(hasMadeLogin).length) {
      return true
    }
  }
  return false
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
