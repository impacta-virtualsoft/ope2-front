import Layout from '~/components/Layout'

const Reports = () => {
  return <div>Relatórios</div>
}

Reports.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default Reports
