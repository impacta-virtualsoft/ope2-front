import colorLib from '@kurkle/color'
import { round } from './numbers'

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

const districtData = [
  { label: 'Casa Verde', population: 75687 },
  { label: 'Tucuruvi', population: 88566 },
  { label: 'Santana', population: 112613 },
  { label: 'Vila Maria', population: 107395 },
  { label: 'Jardim Tremembé', population: 185731 },
  { label: 'Vila Guilherme', population: 48407 },
]
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
const CHART_COLORS2 = {
  red: 'rgb(59, 46, 245)',
  orange: 'rgb(156, 238, 25)',
  yellow: 'rgb(15, 248, 159)',
  green: 'rgb(28, 195, 195)',
  blue: 'rgb(23, 148, 231)',
  purple: 'rgb(102, 31, 243)',
  grey: 'rgb(150, 154, 163)',
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
  ordersYesterday: {
    labels: ['Zeus', 'Poseidom', 'Hera', 'Athena', 'Afrodite'],
    datasets: [
      {
        label: 'Ontem',
        data: generateFakeNumbers({ ...NUMBER_CFG, max: 30 }),
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
      'Jardim Tremembé',
    ],
    datasets: [
      {
        label: 'Clientes por Bairro',
        data: generateFakeNumbers(NUMBER_CFG),
        backgroundColor: Object.values(CHART_COLORS2),
      },
    ],
  },
  ordersByWeekday: {
    labels: ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Mais vendidos por dia da semana',
        data: generateFakeNumbers({ ...NUMBER_CFG, max: 300, count: 6 }),
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  },
  ordersByPotentialClients: {
    labels: [
      'Casa Verde',
      'Santana',
      'Tucuruvi',
      'Vila Maria',
      'Jardim Tremembé',
      'Vila Guilherme',
    ],
    datasets: [
      {
        type: 'bar',
        label: '% Clientes por Distrito',
        data: districtData.map((district) =>
          round(
            (Math.floor(district.population * (Math.random() * 0.05)) /
              district.population) *
              100
          )
        ),

        backgroundColor: [
          ...Object.values(Object.values(CHART_COLORS2)).map((color) =>
            colorLib(color).alpha(0.5).rgbString()
          ),
        ],
        yAxisID: 'yAxis1',
      },
      {
        type: 'line',
        label: 'Habitantes por Distrito',
        data: districtData.map((district) => district.population),
        backgroundColor: colorLib(CHART_COLORS.red).alpha(0.5).rgbString(),
        yAxisID: 'yAxis2',
        borderWidth: 2,
        borderColor: CHART_COLORS.red,
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
  ordersYesterday: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Ontem',
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
  ordersByWeekday: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: ['Mais Vendidos', 'por Dia da Semana'],
      },
    },
  },
  ordersByPotentialClients: {
    responsive: true,
    scales: {
      yAxis1: {
        type: 'linear',
      },
      yAxis2: {
        type: 'logarithmic',
        position: 'right',
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '% Clientes x Habitantes',
      },
    },
  },
}

export { data, options }
