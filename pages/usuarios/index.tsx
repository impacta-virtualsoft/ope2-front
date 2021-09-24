import * as React from 'react'
import { useQuery } from 'react-query'
import Layout from '~/components/Layout'
import { getUsers } from '~/service/user'

const User = () => {
  const { data: users, status } = useQuery('users', getUsers)
  const fakeData = [
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

  React.useEffect(() => {
    console.log({ status })
    console.log({ users })
  }, [users, status])

  // if (status === 'loading') {
  //   return <div>Carregando</div>
  // }

  // if (status === 'error') {
  //   return (
  //     <div>
  //       <table>
  //         {fakeData.map((data) => (
  //           <tr key={data.id}>
  //             <td>{data.email}</td>
  //           </tr>
  //         ))}
  //       </table>
  //     </div>
  //   )
  // }

  return (
    <div>
      <table className="table">
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
        {fakeData.map((data) => (
          <tr key={data.id} className="hover">
            <td>{data.id}</td>
            <td>{data.email}</td>
            <td>
              <button type="button" className="btn btn-primary">
                Editar
              </button>{' '}
              <button type="button" className="btn btn-error">
                Apagar
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

User.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default User
