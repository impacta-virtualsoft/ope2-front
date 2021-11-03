import { NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import Layout from '~/components/Layout'
import '~/styles/globals.css'
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

  // Usa o layout definido na página se houver
  const getLayout = Component.CustomLayout ? (
    Component.CustomLayout(<Component {...pageProps} />)
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

  const auth = ({ children }) =>
    Component.isPublic ? (
      children
    ) : (
      <SessionProvider>{children}</SessionProvider>
    )

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Toaster />
          {getLayout}
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
