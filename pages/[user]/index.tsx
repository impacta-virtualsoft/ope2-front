import * as React from 'react'
import { useQuery } from 'react-query'
import Layout from '~/components/Layout'
import { useSession } from '~/helpers/react-query'
import { getUsers } from '~/service/user'

const User = () => {
  const [session, loading] = useSession()
  const { data: users, isSuccess } = useQuery('users', getUsers)

  // React.useEffect(() => {
  //   console.log({ session })
  //   console.log({ loading })
  //   console.log({ isSuccess })
  //   console.log({ users })
  // }, [session, loading, users])

  if (loading) {
    return <div>Carregando</div>
  }

  return <div>olá</div>
}

User.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default User
