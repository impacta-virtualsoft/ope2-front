import { CacheProvider } from '@emotion/react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { PaletteMode } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import Auth from '~/components/Auth'
import Layout from '~/components/Layout'
import { createEmotionCache } from '~/helpers/cache'
import { originalTheme } from '~/helpers/styles'
import { SessionProvider } from '~/service/SessionProvider'
import '~/styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    CustomLayout?: (page: ReactElement) => ReactNode
    isPublic?: boolean
  }
  emotionCache?: typeof clientSideEmotionCache
}
function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppPropsWithLayout) {
  const [mode, setMode] = React.useState<PaletteMode>('dark')
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

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        )
      },
    }),
    []
  )

  // Usa o layout definido na página se houver
  const getLayout = Component.CustomLayout ? (
    Component.CustomLayout(<Component {...pageProps} />)
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
  // Usa Auth se a propriedade isPublic for habilitada (default: false)
  const AuthComponent = ({ children }: ChildrenType) => (
    <SessionProvider>
      {Component.isPublic ? children : <Auth>{children}</Auth>}
    </SessionProvider>
  )

  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <MUIThemeProvider theme={originalTheme}>
            <CssBaseline enableColorScheme />
            <QueryClientProvider client={queryClient}>
              <Hydrate state={dehydratedState}>
                <Toaster />
                <AuthComponent>{getLayout}</AuthComponent>
                <ReactQueryDevtools initialIsOpen={false} />
              </Hydrate>
            </QueryClientProvider>
          </MUIThemeProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

export default App
