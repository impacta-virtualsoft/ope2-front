import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { makeUrl } from '~/helpers/constants'
import { USER_PATH } from '~/helpers/envs'

const usersUrl = makeUrl(USER_PATH)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('cheguei aqui')
  const session = await getSession({ req })
  const token = session?.accessToken

  console.log({ session })
  console.log({ token })

  const allUsers = await axios.get(usersUrl, {
    headers: { Authorization: 'Bearer ' + token },
  })

  console.log({ allUsers })

  res.status(200).json(allUsers)
}
