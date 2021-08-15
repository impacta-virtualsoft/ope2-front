import Link from 'next/link'
import { Pie } from 'react-chartjs-2'
import { data, options } from '~/helpers/fakeData'
import styles from '~/styles/Home.module.css'

const Home = () => {
  return (
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
        <Link href="/clientes">
          <a className={styles.card}>
            <h2>Clientes &rarr;</h2>
            <Pie data={data.clients} options={options.clients} />
          </a>
        </Link>
      </div>
    </main>
  )
}

export default Home
