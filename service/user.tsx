import { USERS_URL } from '~/helpers/constants'
import { service } from '~/service'

type GetUsersType = {
  userId: number
}
async function getUser({ userId }: GetUsersType) {
  try {
    const res = await service({
      method: 'GET',
      url: USERS_URL + userId,
    })
    return res.data as UserType
  } catch (err) {
    console.error('Erro em getUser')
  }
}

async function getUsers() {
  try {
    const res = await service(USERS_URL)
    return res.data as UserType[]
  } catch (err) {
    console.error('Erro em getUsers')
    throw new Error(JSON.stringify(err))
  }
}

export { getUser, getUsers }
