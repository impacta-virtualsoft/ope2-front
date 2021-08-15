import Layout from '~/components/Layout'

const User = () => {
  return <div>Olá</div>
}

User.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default User
