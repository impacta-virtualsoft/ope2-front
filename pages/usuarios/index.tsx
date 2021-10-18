import * as React from 'react'
import { dehydrate, QueryClient } from 'react-query'
import Layout from '~/components/Layout'
import { useError, useUsers } from '~/helpers/hooks'
import { getUsers } from '~/service/user'

export async function getStaticProps() {
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

  // React.useEffect(() => {
  //   console.log({ status })
  //   console.log({ users })
  // }, [users, status])

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
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data: UserType) => (
            <tr key={data.id} className="hover">
              <td>{data.id}</td>
              <td>{data.email}</td>
              <td>
                <button type="button" className="btn btn-primary">
                  Editar
                </button>{' '}
                <button type="button" className="btn btn-error">
                  Apagar
                </button>
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
