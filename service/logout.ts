import axios from 'axios'
import { CSRF_URL, SIGNOUT_URL } from '~/helpers/constants'

export default async function logout() {
  // console.log('==> LOGOUT')
  try {
    const csrf = await axios.get(CSRF_URL)
    const logout = await axios.post(SIGNOUT_URL, csrf.data)
    // console.log({ csrf })
    // console.log({ logout })
    return logout
  } catch (err) {
    console.log('Erro no logout')

    throw new Error('Erro no logout')
  }
}
