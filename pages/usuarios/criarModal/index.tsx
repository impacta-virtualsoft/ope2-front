import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Controller, FieldError, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { useMutation } from 'react-query'
import Select from 'react-select'
import FormHelper from '~/components/FormHelper'
import { useError } from '~/helpers/hooks'
import { createUser } from '~/service/user'

Modal.setAppElement('#__next')

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
type FormUserType = Omit<UserType, 'groups'> & {
  confirm_password: string
  groups: typeof groupOptions
}
const CreateUser = () => {
  const router = useRouter()
  const mutation = useMutation(createUser)
  const { errorMessage } = useError({
    isError: mutation.isError,
    error: mutation.error,
  })
  const [selectedGroup, setSelectedGroup] = React.useState<typeof groupOptions>(
    []
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<FormUserType>({
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

  function onSubmit(data: FormUserType) {
    const newData = {
      ...data,
      groups: data.groups.map((group) => group.value),
    }
    console.log({ newData })
    mutation.mutate(newData)
  }

  function handleCloseModal() {
    router.back()
  }

  React.useEffect(() => {
    router.prefetch('/usuarios')
  }, [])

  React.useEffect(() => {
    if (mutation.isLoading) {
      toast.loading('Criando usuário...')
    } else {
      toast.dismiss()
      if (mutation.isError) {
        toast.error('Erro ocorreu: ' + errorMessage)
      }
      if (mutation.isSuccess) {
        toast.success('Usuário criado com sucesso!')
      }
    }
    // console.log(mutation)
  }, [mutation])

  React.useEffect(() => {
    console.log({ errors })
    console.log(errors.confirm_password ? errors.confirm_password : null)
  }, [errors])

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={handleCloseModal}
        contentLabel="Modal de Criação de Usuário"
      >
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <h2 className="prose prose-xl">Criar novo usuário</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="shadow sm:rounded-md">
                  <div className="px-4 py-5 bg-white space-y-4">
                    <div className="grid grid-cols-6 gap-3">
                      <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="first_name" className="label">
                          <span className="label-text">
                            Nome <span className="text-warning">*</span>
                          </span>
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            {...register('first_name', {
                              required: 'Nome é obrigatório',
                            })}
                            type="text"
                            id="first_name"
                            className={clsx(
                              'input input-bordered flex-1 block w-full sm:text-sm',
                              errors.first_name ? 'input-error' : null
                            )}
                            placeholder="João"
                          />
                        </div>
                        <FormHelper
                          helperText={'O primeiro nome. Exemplo: "João"'}
                          errorObject={errors.first_name}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="last_name" className="label">
                          <span className="label-text">
                            Sobrenome <span className="text-warning">*</span>
                          </span>
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            {...register('last_name', {
                              required: 'Sobrenome é obrigatório',
                            })}
                            type="text"
                            id="last_name"
                            className={clsx(
                              'input input-bordered flex-1 block w-full sm:text-sm',
                              errors.last_name ? 'input-error' : null
                            )}
                            placeholder="da Silva"
                          />
                        </div>
                        <FormHelper
                          helperText={'Sobrenome, por exemplo: "da Silva"'}
                          errorObject={errors.last_name}
                        />
                      </div>
                    </div>

                    <div className="col-span-3 sm:col-span-3">
                      <label htmlFor="email" className="label">
                        <span className="label-text">
                          Email <span className="text-warning">*</span>
                        </span>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          {...register('email', {
                            required: 'Email é obrigatório',
                          })}
                          type="email"
                          name="email"
                          id="email"
                          className={clsx(
                            'input input-bordered flex-1 block w-full sm:text-sm',
                            errors.email ? 'input-error' : null
                          )}
                          placeholder="joao@dasilva.com"
                        />
                      </div>
                      <FormHelper
                        helperText="O endereço de email da pessoa, exemplo: jose@dasilva.com"
                        errorObject={errors.email}
                      />
                    </div>

                    <div className="grid grid-cols-6 gap-3">
                      <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="password" className="label">
                          <span className="label-text">
                            Senha <span className="text-warning">*</span>
                          </span>
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            {...register('password', {
                              validate: (value) =>
                                value === watch('confirm_password') ||
                                'As senhas não são iguais',
                              required: 'Senha é obrigatório',
                            })}
                            type="password"
                            name="password"
                            id="password"
                            className={clsx(
                              'input input-bordered flex-1 block w-full sm:text-sm',
                              errors.password ? 'input-error' : null
                            )}
                          />
                        </div>
                        <FormHelper
                          helperText="Uma senha, que não pode ser igual seu email"
                          errorObject={errors.password}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="confirm_password" className="label">
                          <span className="label-text">
                            Confirme a senha{' '}
                            <span className="text-warning">*</span>
                          </span>
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            {...register('confirm_password', {
                              validate: (value) =>
                                value === watch('password') ||
                                'As senhas não são iguais',
                              required: 'Confirmar a senha é obrigatório',
                            })}
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            className={clsx(
                              'input input-bordered flex-1 block w-full sm:text-sm',
                              errors.confirm_password ? 'input-error' : null
                            )}
                            aria-describedBy="helper-confirm_password"
                          />
                        </div>
                        <FormHelper
                          helperText="Para conferir, digite novamente a senha"
                          errorObject={errors.confirm_password}
                          id="helper-confirm_password"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="recipe" className="label">
                        <span className="label-text">
                          Grupo <span className="text-warning">*</span>
                        </span>
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
                                className={clsx(
                                  'no-ring focus:ring-transparent focus:border-indigo-500 input input-bordered flex-1 block w-full rounded sm:text-sm',
                                  errors.groups
                                    ? 'border-error'
                                    : 'border-gray-300'
                                )}
                                classNamePrefix="rs"
                                id="groups"
                                name="groups"
                                placeholder="Selecione pelo menos 1 grupo..."
                                noOptionsMessage={({ inputValue }) =>
                                  'Sem opções com a busca ' + inputValue
                                }
                                isMulti
                              />
                            )
                          }}
                          rules={{ required: 'Selecione pelo menos 1 grupo' }}
                        />
                      </div>
                      <FormHelper
                        helperText="Grupo(s) pelo qual(is) o(a) usuário(a) fará parte. Você pode selecionar mais de um."
                        errorObject={errors.groups as unknown as FieldError}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="reset" className="btn">
                      Apagar tudo
                    </button>{' '}
                    <button
                      type="submit"
                      className={clsx(
                        'btn btn-primary',
                        !mutation.isLoading && 'disabled'
                      )}
                    >
                      Criar usuário
                    </button>{' '}
                    <button
                      onClick={handleCloseModal}
                      className="btn"
                      type="button"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <DevTool control={control} />
    </>
  )
}

CreateUser.CustomLayout = function customLayout(page: React.ReactElement) {
  return <>{page}</>
}

export default CreateUser
