import Layout from '~/components/Layout'

const Orders = () => {
  return <div>Pedidos</div>
}

Orders.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default Orders
