import { API_URL, USER_PATH } from '~/helpers/env'
import { service } from '~/service'

const USERS_URL = API_URL! + USER_PATH

async function getUsers() {
  try {
    const res = await service(USERS_URL)
    console.log({ res })
    return res.data
  } catch (err) {
    console.error(err)
  }
}

type GetUsersType = {
  userId: number
}
async function getUser({ userId }: GetUsersType) {
  try {
    const res = await service({
      method: 'GET',
      url: USERS_URL + userId,
    })
    console.log({ res })
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export { getUsers }
