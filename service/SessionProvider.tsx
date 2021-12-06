import * as React from 'react'

const SessionContext = React.createContext<UserTypeRes | undefined>(undefined)

export function SessionProvider({ children }: React.PropsWithChildren<any>) {
  const example = {
    id: 1,
    first_name: '',
    last_name: '',
    email: 'backend@virtualsoft.dev.br',
    groups: [5],
  }
  return (
    <SessionContext.Provider value={example}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = React.useContext(SessionContext)

  if (context === undefined) {
    throw new Error('useSession deve ser usado dentro de SessionProvider')
  }

  return context
}
