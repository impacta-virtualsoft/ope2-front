import { USERS_URL } from '~/helpers/constants'
import { service } from '~/service'

export type GetUsersType = {
  userId?: string
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

async function getUser({ userId }: GetUsersType) {
  try {
    if (!userId) throw new Error('No userId')
    const res = await service(`${USERS_URL}/${userId}`)
    return res.data as UserType
  } catch (err) {
    console.error('Erro em getUser')
    throw new Error(JSON.stringify(err))
  }
}

async function createUser(payload: UserType) {
  try {
    const res = await service.post(USERS_URL + '/', payload)
    return res.status
  } catch (err) {
    console.error('Erro em createUser')
    throw new Error(JSON.stringify(err))
  }
}

async function deleteUser(id: Pick<UserType, 'id'>) {
  try {
    const res = await service.delete(USERS_URL + '/' + id)
    return res.status
  } catch (err) {
    console.error('Erro em createUser')
    throw new Error(JSON.stringify(err))
  }
}

export { getUsers, getUser, createUser, deleteUser }
