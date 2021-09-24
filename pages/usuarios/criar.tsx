import * as React from 'react'
import Select from 'react-select'

const groupOptions = [
  {
    label: 'Administrativo',
    value: 1,
  },
  { label: 'Caixa', value: 2 },
  {
    label: 'Cozinha',
    value: 3,
  },
  {
    label: 'Proprietário',
    value: 4,
  },
  {
    label: 'Superuser',
    value: 5,
  },
]
const CreateUser = () => {
  const [selectedGroup, setSelectedGroup] = React.useState<any>(null)
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Novo Usuário
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Cadastre as informações de um novo usuário do sistema
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nome
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                          placeholder="José da Silva"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        O nome pelo qual a pessoa é conhecida
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        placeholder="jose@dasilva.com"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      O endereço de email da pessoa, exemplo: jose@dasilva.com
                    </p>
                  </div>

                  <div className="col-span-3 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Senha
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Uma senha, que não pode ser igual seu email
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="recipe"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Grupo
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Select
                        options={groupOptions}
                        onChange={setSelectedGroup}
                        defaultValue={selectedGroup}
                        className="focus:ring-0 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        id="recipe"
                        name="recipe"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Procure pela receita ou selecione na lista. Ao selecionar
                      a receita, você terá o controle de estoque dos
                      ingredientes.
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateUser
