import React from 'react'
import { useQuery } from 'react-query'

export type User = {
  name: string
}
function assertIsUser(user: any): asserts user is User {
  if (!('name' in user)) {
    throw new Error('Not user')
  }
}

type Params = {
  queryKey: [string, { id: number }]
}
async function getUser(params: Params) {
  const [, { id }] = params.queryKey
  const response = await fetch(`https://swapi.dev/api/people/${id}/`)
  if (!response.ok) {
    throw new Error('Problem fetching user')
  }
  const user = await response.json()
  assertIsUser(user)

  return user
}

type AppDataType = {
  user: User | null
}
const Context = React.createContext<AppDataType | {}>({})

export function Provider({ children }: { children: React.ReactNode }) {
  const { data: user } = useQuery<User, Error>(
    ['user', { id: 1 }],
    getUser as any
  )

  return <Context.Provider value={{ user }}>{children}</Context.Provider>
}

export const useData = () => React.useContext(Context)
