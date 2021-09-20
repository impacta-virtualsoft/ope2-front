import { API_URL, USER_PATH } from '~/helpers/env'
import service from '~/service'

const USERS_URL = API_URL! + USER_PATH

type GetUserType = {
  userId: string
}
async function getUser(userId: GetUserType) {
  const res = await service.get(USERS_URL + userId)
  return res.data
}

export { getUser }
