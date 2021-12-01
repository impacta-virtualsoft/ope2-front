import { trailSlasher, USERS_URL } from '~/helpers/constants'
import { service } from '~/service'

export type GetUsersType = {
  userId?: string
}

export async function getUsers() {
  try {
    const res = await service(trailSlasher(USERS_URL))
    return res.data as PaginatedResult<UserType>
  } catch (err) {
    console.error('Erro em getUsers')
    throw new Error(JSON.stringify(err))
  }
}

export async function getUser({ userId }: GetUsersType) {
  try {
    if (!userId) throw new Error('No userId')
    const res = await service(`${USERS_URL}/${userId}`)
    return res.data as UserType
  } catch (err) {
    console.error('Erro em getUser')
    throw new Error(JSON.stringify(err))
  }
}

export async function createUser(payload: UserType) {
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

export async function deleteUser(id: UserType['id']) {
  try {
    const res = await service.delete(USERS_URL + '/' + id)
    return res.status
  } catch (err) {
    console.error('Erro em deleteUser')
    throw new Error(JSON.stringify(err))
  }
}

export async function deleteMultipleUsers(ids: UserType['id'][]) {
  try {
    await Promise.all(ids.map(async (userId) => await deleteUser(userId)))
  } catch (err) {
    console.error('Erro em deleteMultipleUsers')
    throw new Error(JSON.stringify(err))
  }
}

export async function editUser(userData: Partial<UserType>) {
  try {
    const res = await service.patch(`${USERS_URL}/${userData.id}/`, userData)
    return res.status
  } catch (err) {
    console.error('Erro em editUser')
    throw new Error(JSON.stringify(err))
  }
}
