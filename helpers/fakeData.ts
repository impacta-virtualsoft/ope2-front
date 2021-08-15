let _seed = Date.now()
function rand(min: number = 0, max: number = 0): number {
  _seed = (_seed * 9301 + 49297) % 233280
  return min + (_seed / 233280) * (max - min)
}

type generateFakeNumbersType = {
  min?: number
  max?: number
  from?: number[]
  count?: number
  decimals?: number
  continuity?: number
}
function generateFakeNumbers({
  min = 0,
  max = 100,
  from = [],
  count = 8,
  decimals = 0,
  continuity = 1,
}: generateFakeNumbersType) {
  const dfactor = Math.pow(10, decimals) || 0
  const data = []

  for (let i = 0; i < count; ++i) {
    const value = (from[i] || 0) + rand(min, max)
    if (rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor)
    } else {
      data.push(null)
    }
  }

  return data
}

const DATA_COUNT = 5
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }
const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
}

const data = {
  products: {
    labels: ['Zeus', 'Poseidom', 'Hera', 'Athena', 'Afrodite'],
    datasets: [
      {
        label: 'Produtos Mais Vendidos',
        data: generateFakeNumbers(NUMBER_CFG),
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  },
  orders: {
    labels: ['Zeus', 'Poseidom', 'Hera', 'Athena', 'Afrodite'],
    datasets: [
      {
        label: 'Hoje',
        data: generateFakeNumbers({ ...NUMBER_CFG, max: 50 }),
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  },
  clients: {
    labels: [
      'Casa Verde',
      'Santana',
      'Tucuruvi',
      'Vila Maria',
      'Parada Inglesa',
    ],
    datasets: [
      {
        label: 'Clientes por Bairro',
        data: generateFakeNumbers(NUMBER_CFG),
        backgroundColor: Object.values({
          red: 'rgb(59, 46, 245)',
          orange: 'rgb(156, 238, 25)',
          yellow: 'rgb(15, 248, 159)',
          green: 'rgb(28, 195, 195)',
          blue: 'rgb(23, 148, 231)',
          purple: 'rgb(102, 31, 243)',
          grey: 'rgb(150, 154, 163)',
        }),
      },
    ],
  },
}

const options = {
  products: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: ['Mais Vendidos', 'últimos 30 dias'],
      },
    },
  },
  orders: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Hoje',
      },
    },
  },
  clients: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'por Bairro',
      },
    },
  },
}

export { data, options }
