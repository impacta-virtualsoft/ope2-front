// import { useSession } from '@next-auth/react-query'
import { NextPage } from 'next'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import 'tailwindcss/tailwind.css'
import Layout from '~/components/Layout'
// import { UserProvider } from '~/service/UserProvider'

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    CustomLayout?: (page: ReactElement) => ReactNode
    isPublic?: boolean
  }
}
function App({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient())
  // Configura o provider do next-auth (login)
  const providerOptions = {
    // Client Max Age controls how often the useSession in the client should
    // contact the server to sync the session state. Value in seconds.
    // e.g.
    // * 0  - Disabled (always use cache value)
    // * 60 - Sync session state with server if it's older than 60 seconds
    clientMaxAge: 0,
    // Keep Alive tells windows / tabs that are signed in to keep sending
    // a keep alive request (which extends the current session expiry) to
    // prevent sessions in open windows from expiring. Value in seconds.
    //
    // Note: If a session has expired when keep alive is triggered, all open
    // windows / tabs will be updated to reflect the user is signed out.
    keepAlive: 0,
  }
  // Usa o layout definido na página se houver
  const getLayout = Component.CustomLayout ? (
    Component.CustomLayout(<Component {...pageProps} />)
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
  // Usa Auth se a propriedade isPublic for habilitada (default: false)
  const AuthComponent = ({ children }: GenericChildren) => (
    <SessionProvider session={session}>
      {Component.isPublic ? children : <Auth>{children}</Auth>}
    </SessionProvider>
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <AuthComponent>{getLayout}</AuthComponent>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

function Auth({ children }: GenericChildren): any {
  const { data: session, status } = useSession()
  const isUser = !!session?.user

  React.useEffect(() => {
    console.log({ session })
    console.log({ status })
    if (status === 'loading') return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, session, status])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

export default App
