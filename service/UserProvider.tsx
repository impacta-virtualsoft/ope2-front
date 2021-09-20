import React from 'react'
import { useQuery } from 'react-query'

export type User = {
  name?: string
  username: string
  email: string
  password: string
  groups?: any[]
}
function assertIsUser(user: any): asserts user is User {
  if (!('email' in user) || !('username' in user)) {
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

type UserContextType = {
  user?: User | null
}
const UserContext = React.createContext<UserContextType>(undefined!)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user } = useQuery<User, Error>(
    ['user', { id: 1 }],
    getUser as any
  )

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export const useData = () => React.useContext(UserContext)
