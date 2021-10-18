import colorLib from '@kurkle/color'
import color from 'color'
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

const Data = (darkMode = false) => {
  const genericBackgroundColor = darkMode
    ? Object.values(CHART_COLORS).map((c) =>
        color(c).darken(0.5).rgb().string()
      )
    : Object.values(CHART_COLORS)
  const genericBorderColor = darkMode ? '#333' : '#efefef'
  return {
    products: {
      labels: ['Zeus', 'Poseidom', 'Hera', 'Athena', 'Afrodite'],
      datasets: [
        {
          label: 'Produtos Mais Vendidos',
          data: generateFakeNumbers(NUMBER_CFG),
          backgroundColor: genericBackgroundColor,
          borderColor: genericBorderColor,
        },
      ],
    },
    orders: {
      labels: ['Zeus', 'Poseidom', 'Hera', 'Athena', 'Afrodite'],
      datasets: [
        {
          label: 'Hoje',
          data: generateFakeNumbers({ ...NUMBER_CFG, max: 50 }),
          backgroundColor: genericBackgroundColor,
          borderColor: genericBorderColor,
        },
      ],
    },
    ordersYesterday: {
      labels: ['Zeus', 'Poseidom', 'Hera', 'Athena', 'Afrodite'],
      datasets: [
        {
          label: 'Ontem',
          data: generateFakeNumbers({ ...NUMBER_CFG, max: 30 }),
          backgroundColor: genericBackgroundColor,
          borderColor: genericBorderColor,
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
}

const Options = (darkMode = false) => {
  const invertColor = {
    color: darkMode ? '#efefef' : '#333',
  }

  return {
    products: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            ...invertColor,
          },
        },
        title: {
          display: true,
          text: ['Mais Vendidos', 'últimos 30 dias'],
          ...invertColor,
        },
      },
    },
    orders: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            ...invertColor,
          },
        },
        title: {
          display: true,
          text: 'Hoje',
          ...invertColor,
        },
      },
    },
    ordersYesterday: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          fontColor: darkMode ? '#efefef' : '#333',
          labels: {
            ...invertColor,
          },
        },
        title: {
          display: true,
          text: 'Ontem',
          ...invertColor,
        },
      },
    },
    clients: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          fontColor: darkMode ? '#efefef' : '#333',
          labels: {
            ...invertColor,
          },
        },
        title: {
          display: true,
          text: 'por Bairro',
          ...invertColor,
        },
      },
    },
    ordersByWeekday: {
      responsive: true,
      scales: {
        x: {
          ticks: { ...invertColor },
        },
        y: {
          ticks: { ...invertColor },
        },
      },

      plugins: {
        legend: {
          display: false,
          fontColor: darkMode ? '#efefef' : '#333',
          labels: {
            ...invertColor,
          },
        },
        title: {
          display: true,
          text: ['Mais Vendidos', 'por Dia da Semana'],
          ...invertColor,
        },
      },
    },
    ordersByPotentialClients: {
      responsive: true,
      scales: {
        yAxis1: {
          type: 'linear',
          ticks: { ...invertColor },
        },
        yAxis2: {
          type: 'logarithmic',
          position: 'right',
          ticks: { ...invertColor },
        },
        x: {
          ticks: { ...invertColor },
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            ...invertColor,
          },
        },
        title: {
          display: true,
          text: '% Clientes x Habitantes',
          ...invertColor,
        },
      },
    },
  }
}

const fakeGroupOptions = [
  {
    id: 4,
    email: 'caixa@divinahamburgueria.com.br',
    password:
      'argon2$argon2i$v=19$m=512,t=2,p=2$WnI5VDJFWUJ3Wno5$eC2Bxndxu2Rr26tEyfsC2A',
    groups: [1],
  },
  {
    id: 5,
    email: 'cozinha@divinahamburgueria.com.br',
    password:
      'argon2$argon2i$v=19$m=512,t=2,p=2$WllNU1k0ak9PRlVt$bD8jzVO5UBH4nYsZxSeRdA',
    groups: [2],
  },
  {
    id: 6,
    email: 'proprietario@divinahamburgueria.com.br',
    password:
      'argon2$argon2i$v=19$m=512,t=2,p=2$NHkyMkwzeVhDR2dj$OKZsjLeYcWYnLvblDrpFxQ',
    groups: [4],
  },
  {
    id: 3,
    email: 'administrativo@divinahamburgueria.com.br',
    password:
      'argon2$argon2i$v=19$m=512,t=2,p=2$MXM0REJQY2lrWWpN$YnDl5H1UK5n0eSlpjc3S4w',
    groups: [3],
  },
  {
    id: 1,
    email: 'backend@virtualsoft.dev.br',
    password:
      'argon2$argon2i$v=19$m=512,t=2,p=2$dUkwN3lLYkpkTDh3$yj28XiEVx0IdVQKOmFOarQ',
    groups: [5],
  },
  {
    id: 2,
    email: 'frontend@virtualsoft.dev.br',
    password:
      'argon2$argon2i$v=19$m=512,t=2,p=2$OVhabDFnZkNqN09C$+B+ZxZwc9xNvWNhhpiwwhg',
    groups: [5],
  },
]

export { Data, Options, fakeGroupOptions }
