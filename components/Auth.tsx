import { signIn } from 'next-auth/react'
import * as React from 'react'
import { useSession } from '~/helpers/react-query'

function Auth({ children }: ChildrenType): any {
  // const { data: session, status } = useSession()
  const [session, loading] = useSession()
  const isUser = !!session?.user

  React.useEffect(() => {
    // console.log({ session })
    // console.log({ status })
    // console.log({ loading })
    // if (status === 'loading') return // Do nothing while loading
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
    // }, [isUser, session, status])
  }, [isUser, session, loading])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

export default Auth
