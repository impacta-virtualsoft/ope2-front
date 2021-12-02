import { makeUrl } from '~/helpers/constants'
import { PERMISSION_PATH } from '~/helpers/envs'
import { service } from '~/service'

export async function getPermissions() {
  const permissionUrl = makeUrl(PERMISSION_PATH)
  try {
    const res = await service(permissionUrl)
    return res.data as PermissionsType
  } catch (err) {
    console.error('Erro em getPermissions')
    throw new Error(JSON.stringify(err))
  }
}
