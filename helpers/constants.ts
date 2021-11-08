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

function trailSlasher(str: string) {
  return str + '/'
}

const groupOptions = [
  {
    label: 'Administrativo',
    value: 1,
  },
  { label: 'Caixa', value: 2 },
  {
    label: 'Cozinha',
    value: 3,
  },
  {
    label: 'Proprietário',
    value: 4,
  },
  {
    label: 'Superuser',
    value: 5,
  },
]

export {
  API_REQUEST_HEADERS,
  CSRF_URL,
  SIGNOUT_URL,
  LOGIN_URL,
  USERS_URL,
  REFRESHTOKEN_URL,
  DATE_UNTIL_TOKEN_EXPIRES,
  trailSlasher,
  groupOptions,
}
