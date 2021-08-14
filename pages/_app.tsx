import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import 'tailwindcss/tailwind.css'

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Usa o layout definido na página se houver
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
export default MyApp
