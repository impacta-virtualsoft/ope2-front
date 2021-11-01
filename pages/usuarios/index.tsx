import { GetStaticProps } from 'next'
import Link from 'next/link'
import * as React from 'react'
import { dehydrate, QueryClient } from 'react-query'
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
  const { data: users, isLoading, isError, error } = useUsers()
  const { errorMessage } = useError({ isError, error })

  const handleDelete = (id: Pick<UserType, 'id'>) => async () => {
    console.log('GONNA DELETE USER ' + id)
    if (id) await deleteUser(id)
  }
  const handleDeleteTest = (id: Pick<UserType, 'id'>) => () => {
    console.log({ id })
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

  if (!users) return null

  return (
    <div>
      <div>
        <button className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 mr-2 stroke-current transform rotate-45"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Criar
        </button>
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
          {users.map((user) => (
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
                  htmlFor="delete-modal"
                  className="btn btn-error modal-button"
                >
                  Apagar
                </label>
                <input
                  type="checkbox"
                  id="delete-modal"
                  className="modal-toggle"
                  onClick={handleDeleteTest(user.id)}
                  data-user-id={user.id}
                />
                <div className="modal">
                  <div className="modal-box">
                    <p>Você tem certeza que deseja apagar esse usuário?</p>
                    <div className="modal-action">
                      <label
                        htmlFor="delete-modal"
                        className="btn btn-error"
                        onClick={handleDelete(user.id)}
                        data-user-id={user.id}
                      >
                        Apagar
                      </label>
                      <label htmlFor="delete-modal" className="btn">
                        Fechar
                      </label>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

User.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default User
