import React from 'react'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { getUsers } from '~/service/user'

type UseErrorType = {
  isError: boolean
  error: unknown
}
function useError({ isError, error }: UseErrorType) {
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  React.useEffect(() => {
    if (isError) {
      try {
        const message = JSON.parse(
          (error as GenericObject<unknown>).message as string
        ).message
        toast.error(
          message ? `Erro inesperado: ${errorMessage}` : 'Erro inesperado',
          {
            position: 'bottom-right',
          }
        )
        setErrorMessage(message)
      } catch {}
    }
  }, [isError, error])

  return { errorMessage }
}

function useUsers() {
  const query = useQuery('users', getUsers)

  return query
}

export { useError, useUsers }
