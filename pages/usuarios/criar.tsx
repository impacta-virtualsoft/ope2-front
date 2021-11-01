import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import Select from 'react-select'
import { useError } from '~/helpers/hooks'
import { createUser } from '~/service/user'

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
  const [selectedGroup, setSelectedGroup] = React.useState<typeof groupOptions>(
    []
  )
  const { register, handleSubmit, reset, control } = useForm<UserType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    delayError: undefined,
    defaultValues: {},
  })
  const mutation = useMutation((userPayload) => {
    return createUser(userPayload)
  })
  const { errorMessage } = useError({
    isError: mutation.isError,
    error: mutation.error,
  })

  function onSubmit(data) {
    const newData = {
      ...data,
      groups: data.groups.map((group) => group.value),
    }
    console.log(newData)
    mutation.mutate(newData)
  }

  React.useEffect(() => {
    if (mutation.isLoading) {
      toast.loading('Criando usuário...')
    } else {
      toast.dismiss()
      if (mutation.isError) {
        toast.error('Erro ocorreu!')
      }
      if (mutation.isSuccess) {
        toast.success('Usuário criado com sucesso!')
      }
    }
    // console.log(mutation)
  }, [mutation])

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Novo Usuário
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Cadastre as informações de um novo usuário do sistema
              </p>
            </div>
          </div> */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <h2 className="prose prose-xl">Criar novo usuário</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white space-y-4">
                  <div className="grid grid-cols-6 gap-3">
                    <div className="col-span-3 sm:col-span-3">
                      <label htmlFor="first_name" className="label">
                        <span className="label-text">Nome</span>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          {...register('first_name')}
                          type="text"
                          id="first_name"
                          className="input input-bordered flex-1 block w-full sm:text-sm"
                          placeholder="João"
                        />
                      </div>
                      <p className="label label-text-alt">
                        O primeiro nome. Exemplo: "João"
                      </p>
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                      <label htmlFor="last_name" className="label">
                        <span className="label-text">Sobrenome</span>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          {...register('last_name')}
                          type="text"
                          id="last_name"
                          className="input input-bordered flex-1 block w-full sm:text-sm"
                          placeholder="João"
                        />
                      </div>
                      <p className="label label-text-alt">
                        Sobrenome, por exemplo: "da Silva"
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="email" className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        {...register('email')}
                        type="email"
                        name="email"
                        id="email"
                        className="input input-bordered flex-1 block w-full sm:text-sm"
                        placeholder="joao@dasilva.com"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      O endereço de email da pessoa, exemplo: jose@dasilva.com
                    </p>
                  </div>

                  <div className="grid grid-cols-6 gap-3">
                    <div className="col-span-3 sm:col-span-3">
                      <label htmlFor="password" className="label">
                        <span className="label-text">Senha</span>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          {...register('password')}
                          type="password"
                          name="password"
                          id="password"
                          className="input input-bordered flex-1 block w-full sm:text-sm"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Uma senha, que não pode ser igual seu email
                      </p>
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                      <label htmlFor="confirm_password" className="label">
                        <span className="label-text">Confirme a senha</span>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="password"
                          name="confirm_password"
                          id="confirm_password"
                          className="input input-bordered flex-1 block w-full sm:text-sm"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Digite novamente a senha
                      </p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="recipe" className="label">
                      <span className="label-text">Grupo</span>
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Controller
                        control={control}
                        name="groups"
                        render={({ field: { onChange, value, ref } }) => {
                          return (
                            <Select
                              inputRef={ref}
                              options={groupOptions}
                              onChange={(val) => onChange(val)}
                              defaultValue={selectedGroup}
                              className="no-ring focus:ring-transparent focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                              id="groups"
                              name="groups"
                              isMulti
                            />
                          )
                        }}
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
                    type="reset"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md btn"
                  >
                    Apagar tudo
                  </button>{' '}
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md btn btn-primary"
                  >
                    Criar usuário
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
