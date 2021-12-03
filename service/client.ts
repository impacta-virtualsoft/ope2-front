import { makeUrl, trailSlasher } from '~/helpers/constants'
import { CLIENT_PATH } from '~/helpers/envs'
import { service } from '~/service'

const clientUrl = makeUrl(CLIENT_PATH)

export async function getClients() {
  try {
    const res = await service(`${clientUrl}`)
    return res.data as PaginatedResult<ClientType>
  } catch (err) {
    console.error('Erro em getClients')
    throw new Error(JSON.stringify(err))
  }
}

export async function getClient(clientId: ClientType['id']) {
  try {
    if (!clientId) throw new Error('No clientId')
    const res = await service(`${clientUrl}/${clientId}`)
    return res.data as ClientType
  } catch (err) {
    console.error('Erro em getClient')
    throw new Error(JSON.stringify(err))
  }
}

export async function createClient(payload: FormNewClient) {
  try {
    const res = await service.post(trailSlasher(clientUrl), payload)
    return res.status
  } catch (error: any) {
    console.error('Erro em createClient', JSON.stringify(error))
    if (error.response) {
      console.error({ response: error.response })
    }
    throw new Error(JSON.stringify(error))
  }
}

export async function deleteClient(id: ClientType['id']) {
  try {
    const res = await service.delete(clientUrl + '/' + id)
    return res.status
  } catch (err) {
    console.error('Erro em deleteClient')
    throw new Error(JSON.stringify(err))
  }
}

export async function deleteMultipleClients(ids: ClientType['id'][]) {
  try {
    await Promise.all(ids.map(async (userId) => await deleteClient(userId)))
  } catch (err) {
    console.error('Erro em deleteMultipleClients')
    throw new Error(JSON.stringify(err))
  }
}

export async function editClient(clientData: Partial<ClientType>) {
  try {
    const res = await service.patch(
      `${clientUrl}/${clientData.id}/`,
      clientData
    )
    return res.status
  } catch (err) {
    console.error('Erro em editClient')
    throw new Error(JSON.stringify(err))
  }
}
