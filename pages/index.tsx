import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Data, Options } from '~/helpers/fakeData'

type GridWithChartType = {
  href: string
  data: any
  options: any
  title?: string
  type?: string
  perRow?: number
  [key: string]: any
}
const GridWithChart = ({
  href,
  data,
  options,
  title,
  type = 'pie',
  perRow = 3,
  ...rest
}: GridWithChartType) => {
  return (
    <Link href={href}>
      <a
        className={`m-6 p-6 border dark:border-gray-800 text-left color no-underline rounded-lg transition ease-in duration-200 w-home-three`}
        {...rest}
      >
        {title ? <h2>{title} &rarr;</h2> : null}
        {type === 'pie' ? <Pie data={data} options={options} /> : null}
        {type === 'bar' ? <Bar data={data} options={options} /> : null}
      </a>
    </Link>
  )
}

const Home = () => {
  const { theme, setTheme } = useTheme()
  const [options, setOptions] = React.useState(Options())
  const [data, setData] = React.useState(Data())

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  React.useEffect(() => {
    const isDarkTheme = false
    // localStorage.theme !== 'light' ||
    // (!('theme' in localStorage) &&
    //   window.matchMedia('(prefers-color-scheme: dark)').matches)

    // localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')
    setOptions(Options(isDarkTheme))
    setData(Data(isDarkTheme))
  }, [theme])

  return (
    <>
      <main>
        <button onClick={toggleTheme} type="button">
          Tema
        </button>
        <div className="flex items-center justify-center flex-wrap">
          <GridWithChart
            title="Produtos"
            href="/produtos"
            data={data.products}
            options={options.products}
          />
          <GridWithChart
            title="Pedidos"
            href="/pedidos"
            data={data.orders}
            options={options.orders}
          />
          <GridWithChart
            title="Pedidos"
            href="/pedidos"
            data={data.ordersYesterday}
            options={options.ordersYesterday}
          />
          <GridWithChart
            title="Clientes"
            href="/clientes"
            data={data.clients}
            options={options.clients}
          />
          <GridWithChart
            href="/pedidos"
            data={data.ordersByWeekday}
            options={options.ordersByWeekday}
            type="bar"
            style={{ width: '61%' }}
          />
          <GridWithChart
            href="/pedidos"
            data={data.ordersByPotentialClients}
            options={options.ordersByPotentialClients}
            type="bar"
            style={{ width: '93%' }}
          />
        </div>
      </main>

      {/* implementar gráfico de cliente vs potencial cliente (baseado na demografia do distrito) */}
    </>
  )
}

export default Home
