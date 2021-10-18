import {
  API_URL,
  BACKEND_URL,
  LOGIN_PATH,
  REFRESHTOKEN_PATH,
  USER_PATH,
} from './envs'

const API_REQUEST_HEADERS = {
  // accept: '*/*',
  // corsOrigin: '*',
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}
const CSRF_URL = '/api/auth/csrf'
const SIGNOUT_URL = '/api/auth/signout'

const LOGIN_URL = BACKEND_URL! + LOGIN_PATH!
const USERS_URL = API_URL! + USER_PATH
const REFRESHTOKEN_URL = BACKEND_URL! + REFRESHTOKEN_PATH

const DATE_UNTIL_TOKEN_EXPIRES = Date.now() + 1000 * 60 * 60 * 22

export {
  API_REQUEST_HEADERS,
  CSRF_URL,
  SIGNOUT_URL,
  LOGIN_URL,
  USERS_URL,
  REFRESHTOKEN_URL,
  DATE_UNTIL_TOKEN_EXPIRES,
}
