import Link from 'next/link'
import { Bar, Pie } from 'react-chartjs-2'
import { data, options } from '~/helpers/fakeData'
import styles from '~/styles/Home.module.css'

const Home = () => {
  return (
    <>
      <main>
        <div className={styles.grid}>
          <Link href="/produtos">
            <a className={styles.card}>
              <h2>Produtos &rarr;</h2>
              <Pie data={data.products} options={options.products} />
            </a>
          </Link>
          <Link href="/pedidos">
            <a className={styles.card}>
              <h2>Pedidos &rarr;</h2>
              <Pie data={data.orders} options={options.orders} />
            </a>
          </Link>
          <Link href="/pedidos">
            <a className={styles.card}>
              <h2>Pedidos &rarr;</h2>
              <Pie
                data={data.ordersYesterday}
                options={options.ordersYesterday}
              />
            </a>
          </Link>
          <Link href="/clientes">
            <a className={styles.card}>
              <h2>Clientes &rarr;</h2>
              <Pie data={data.clients} options={options.clients} />
            </a>
          </Link>
          <Link href="/pedidos">
            <a style={{ width: '61%' }} className={styles.card}>
              <Bar
                data={data.ordersByWeekday}
                options={options.ordersByWeekday}
              />
            </a>
          </Link>

          <Link href="/pedidos">
            <a style={{ width: '93%' }} className={styles.card}>
              <Bar
                data={data.ordersByPotentialClients}
                options={options.ordersByPotentialClients}
              />
            </a>
          </Link>
        </div>
      </main>

      {/* implementar gráfico de cliente vs potencial cliente (baseado na demografia do distrito) */}
    </>
  )
}

export default Home
