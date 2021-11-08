import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { dehydrate, QueryClient } from 'react-query'
import { useError, useUser } from '~/helpers/hooks'
import { getUser } from '~/service/user'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const nothing = { props: {} }
  const userId = Array.isArray(params?.id) ? params?.id[0] : params?.id

  if (!userId) return nothing

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['user', userId], () => getUser({ userId }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function Editar() {
  const router = useRouter()
  const { data, isLoading, isError, error } = useUser({
    userId: router.query?.id as string | undefined,
  })
  const { errorMessage } = useError({ isError, error })
  const { register, handleSubmit, reset } = useForm<UserType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    delayError: undefined,
    defaultValues: isLoading ? undefined : data,
  })

  function onSubmit(data) {
    console.log(data)
  }

  React.useEffect(() => {
    console.log(isLoading ? isLoading : data)
  }, [isLoading, data])

  React.useEffect(() => {
    reset(data)
  }, [data])

  if (isLoading) {
    return <div>Carregando</div>
  }

  if (isError) {
    return (
      <div>
        <p>Erro inesperado: {errorMessage}</p>
      </div>
    )
  }

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-12 sm:col-span-6">
                {/* <InputText id="id" label="ID" {...register('id')} disabled /> */}
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  ID (apenas para conferência)
                </label>
                <input
                  {...register('id')}
                  type="text"
                  id="id"
                  className="input input-bordered input-disabled"
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first_name" className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  {...register('first_name')}
                  type="text"
                  id="first_name"
                  className="input input-bordered flex-1 block w-full sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last_name" className="label">
                  <span className="label-text">Sobrenome</span>
                </label>
                <input
                  {...register('last_name')}
                  type="text"
                  id="last_name"
                  className="input input-bordered flex-1 block w-full sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register('email')}
                  type="text"
                  id="email"
                  className="input input-bordered flex-1 block w-full sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="password" className="label">
                  <span className="label-text">Senha</span>
                </label>
                <input
                  {...register('password')}
                  type="password"
                  id="password"
                  className="input input-bordered flex-1 block w-full sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="groups"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grupo
                </label>
                <select
                  {...register('groups')}
                  id="groups"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {data?.groups.map((group) => (
                    <option value={group} key={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md btn"
              onClick={() => reset(data)}
            >
              Reiniciar
            </button>{' '}
            <button
              type="reset"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md btn"
            >
              Apagar tudo
            </button>{' '}
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md btn btn-primary"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

export default Editar
