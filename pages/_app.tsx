import { NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import 'tailwindcss/tailwind.css'
import Layout from '~/components/Layout'
import { Provider } from '~/service/Provider'

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    CustomLayout?: (page: ReactElement) => ReactNode
  }
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient())
  // Usa o layout definido na página se houver
  const getLayout = Component.CustomLayout ? (
    Component.CustomLayout(<Component {...pageProps} />)
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider>{getLayout}</Provider>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
export default MyApp
