import React from 'react'
import Header from './Header'
import MainNav from './MainNav'

const navMain = [
  { label: 'Dashboard', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Pedidos', href: '/pedidos' },
  { label: 'Clientes', href: '/clientes' },
  { label: 'Relatórios', href: '/relatorios' },
]
const navUser = ['Perfil', 'Ajustes', 'Sair']

const Layout: React.FC = ({ children }) => {
  const [title, setTitle] = React.useState('Dashboard')

  return (
    <div>
      <MainNav navMain={navMain} navUser={navUser} />
      <Header title={title} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Content */}
          <div className="px-4 py-6 sm:px-0">
            {/* <div className="border-4 border-dashed border-gray-200 rounded-lg"> */}
            {children}
            {/* </div> */}
          </div>
          {/* /End Content */}
        </div>
      </main>
    </div>
  )
}

export default Layout
