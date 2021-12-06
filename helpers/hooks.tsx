import React from 'react'
import { useQuery } from 'react-query'
import { getClients } from '~/service/client'
import { getPermissions } from '~/service/permission'
import {
  getProductDetails,
  getProductTypes,
  getUnitMeasures,
} from '~/service/product'
import { getRecipeDetails } from '~/service/recipe'
import { getUser, getUsers, GetUsersType } from '~/service/user'

type UseErrorType = {
  isError: boolean
  error: Error
}
export function useError({ isError, error }: UseErrorType) {
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  React.useEffect(() => {
    if (isError) {
      try {
        const message = error.message || error.toString()
        // toast.error(message ? `Erro: ${errorMessage}` : 'Erro inesperado', {
        //   position: 'bottom-right',
        // })
        setErrorMessage(message)
      } catch {}
    }
  }, [isError, error])

  return { errorMessage }
}

export function useUsers() {
  const query = useQuery('users', getUsers)
  return query
}

export function useUser({ userId }: GetUsersType) {
  const query = useQuery(['user', userId], () => getUser({ userId }))
  return query
}

export function usePermissions() {
  const query = useQuery('permissions', getPermissions)
  return query
}

// export function useProductDetails({ page }: GetProductDetailsType) {
export function useProductDetails() {
  // const query = useQuery(['productDetails', page], () => getProductDetails({ page }), {     keepPreviousData: true, })
  const query = useQuery('productDetails', getProductDetails)
  return query
}

export function useProductTypes() {
  const query = useQuery('productTypes', getProductTypes)
  return query
}

export function useUnitMeasures() {
  const query = useQuery('unitMeasures', getUnitMeasures)
  return query
}

export function useRecipeDetails() {
  const query = useQuery('recipeDetails', getRecipeDetails)
  return query
}

export function useClients() {
  const query = useQuery('clients', getClients)
  return query
}
