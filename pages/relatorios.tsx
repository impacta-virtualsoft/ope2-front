const Reports = () => {
  return <div>Relatórios</div>
}

Reports.CustomLayout = function customLayout(page: React.ReactElement) {
  return (
    <>
      <h1>Custom Layout!</h1>
      {page}
    </>
  )
}

export default Reports
