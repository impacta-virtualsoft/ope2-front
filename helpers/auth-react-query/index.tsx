// @ts-nocheck
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryOptions } from 'react-query'

export async function fetchSession(): Promise<Session | null> {
  const res = await fetch('/api/auth/session')
  const session = await res.json()
  if (Object.keys(session).length) {
    return session
  }
  return null
}

export function useSession<R extends boolean = false>({
  required,
  redirectTo = '/api/auth/signin?error=SessionExpired',
  queryConfig = {},
}: {
  /** If set to `true`, the returned session is guaranteed to not be `null` */
  required?: R
  /** If `required: true`, the user will be redirected to this URL, if they don't have a session */
  redirectTo?: string
  /** Configuration for `useQuery` */
  queryConfig?: UseQueryOptions<Session | null>
} = {}) {
  const router = useRouter()
  const query = useQuery(['session'], fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error)
      if (data || !required) return
      router.push(redirectTo)
    },
  })
  return [query.data, query.status === 'loading']
}
