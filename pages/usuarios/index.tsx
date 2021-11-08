import clsx from 'clsx'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import * as React from 'react'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from 'react-query'
import Layout from '~/components/Layout'
import { useError, useUsers } from '~/helpers/hooks'
import { deleteUser, getUsers } from '~/service/user'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('users', getUsers)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const User = () => {
  const { data: users, isLoading, isError, isFetching, error } = useUsers()
  const queryClient = useQueryClient()
  const { errorMessage } = useError({ isError, error })
  const mutation = useMutation(deleteUser, {
    onSuccess: () => queryClient.invalidateQueries('users'),
  })

  const handleDelete = async (id: UserType['id']) => {
    mutation.mutate(id)
  }

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

  if (!users || users.results.length <= 0) return null

  return (
    <div>
      <div>
        <Link href="/usuarios/criar">
          <a className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 mr-2 stroke-current transform rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            Criar
          </a>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users && users.results.length > 0
            ? users.results.map((user) => (
                <tr key={user.id} className="hover">
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      href={{
                        pathname: '/usuarios/editar/[id]',
                        query: { id: user.id },
                      }}
                    >
                      <a className="btn btn-secondary">Editar</a>
                    </Link>{' '}
                    <label
                      htmlFor={`delete-modal-${user.id}`}
                      className={clsx(
                        'btn btn-error modal-button',
                        isFetching ? 'btn-disabled' : null
                      )}
                      disabled={isFetching}
                    >
                      Apagar
                    </label>
                    <input
                      type="checkbox"
                      id={`delete-modal-${user.id}`}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box">
                        <p>Você tem certeza que deseja apagar esse usuário?</p>
                        <div className="modal-action">
                          <label
                            htmlFor={`delete-modal-${user.id}`}
                            className="btn btn-error"
                            onClick={() => handleDelete(user.id)}
                          >
                            Apagar
                          </label>
                          <label
                            htmlFor={`delete-modal-${user.id}`}
                            className="btn"
                          >
                            Fechar
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

User.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default User
