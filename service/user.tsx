import { trailSlasher, USERS_URL } from '~/helpers/constants'
import { service } from '~/service'

export type GetUsersType = {
  userId?: string
}

async function getUsers() {
  try {
    const res = await service(trailSlasher(USERS_URL))
    return res.data as PaginatedResult<UserType>
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
    const res = await service.post(trailSlasher(USERS_URL), payload)
    console.log({ res })
    return res.status
  } catch (error: any) {
    console.error('Erro em createUser', JSON.stringify(error))
    if (error.response) {
      console.error({ response: error.response })
    }
    throw new Error(JSON.stringify(error))
  }
}

async function deleteUser(id: UserType['id']) {
  try {
    const res = await service.delete(USERS_URL + '/' + id)
    return res.status
  } catch (err) {
    console.error('Erro em deleteUser')
    throw new Error(JSON.stringify(err))
  }
}

export { getUsers, getUser, createUser, deleteUser }
