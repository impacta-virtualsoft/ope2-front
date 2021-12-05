import {
  Box,
  Button,
  Grid,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import Select from 'react-select'
import LinkButton from '~/components/LinkButton'
import TabPanel from '~/components/TabPanel'
import { groupOptions } from '~/helpers/constants'
import { useError } from '~/helpers/hooks'
import { createUser } from '~/service/user'

const GridActions = styled(Grid)`
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  > button {
    margin-right: 20px;
  }
`

export default function NovoUsuario() {
  const mutation = useMutation(createUser)
  const { errorMessage } = useError({
    isError: mutation.isError,
    error: mutation.error,
  })
  const [tabIndex, setTabIndex] = React.useState(1)
  const [selectedGroup, setSelectedGroup] = React.useState<typeof groupOptions>(
    []
  )
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserType>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      groups: '',
    },
  })

  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTabIndex(newValue)
  }

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    }
  }

  function onSubmit(data: FormUserType) {
    console.log({ data })
    const newData = {
      ...data,
      // groups: data.groups.map((group) => group.value),
      groups: [data.groups.value],
    }
    console.log({ newData })
    mutation.mutate(newData)
  }

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
  }, [mutation, errorMessage])

  React.useEffect(() => {
    console.log({ errors })
    console.log(errors.confirm_password ? errors.confirm_password : null)
  }, [errors])

  return (
    <>
      <Typography variant="h4" gutterBottom component="h2">
        Usuários
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="aba de usuários"
        >
          <Tab
            label="Tabela"
            component={LinkButton}
            href="/usuarios"
            {...a11yProps(0)}
          />
          <Tab
            label="Criar Usuário"
            component={LinkButton}
            href="/usuarios/novo"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
              <Controller
                control={control}
                name="first_name"
                rules={{
                  required: 'Nome é obrigatório',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="first_name"
                    label="Nome"
                    variant="outlined"
                    color="info"
                    fullWidth
                    error={Boolean(errors?.first_name)}
                    helperText={
                      errors?.first_name?.message
                        ? errors.first_name.message
                        : 'O primeiro nome. Exemplo: "João"'
                    }
                  />
                )}
              />
            </Grid>
            <Grid container item xs={6} direction="column">
              <Controller
                control={control}
                name="last_name"
                rules={{
                  required: 'Sobrenome é obrigatório',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="last_name"
                    label="Sobrenome"
                    variant="outlined"
                    color="info"
                    fullWidth
                    error={Boolean(errors?.last_name)}
                    helperText={
                      errors?.last_name?.message
                        ? errors.last_name.message
                        : 'Sobrenome, por exemplo: "da Silva"'
                    }
                  />
                )}
              />
            </Grid>
            <Grid container item xs={12} direction="row">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email é obrigatório',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    color="info"
                    fullWidth
                    error={Boolean(errors?.email)}
                    helperText={
                      errors?.email?.message
                        ? errors.email.message
                        : 'O endereço de email da pessoa, exemplo: jose@dasilva.com'
                    }
                  />
                )}
              />
            </Grid>
            <Grid container item xs={6} direction="column">
              <Controller
                control={control}
                name="password"
                rules={{
                  validate: (value) =>
                    value === watch('confirm_password') ||
                    'As senhas não são iguais',
                  required: 'Senha é obrigatório',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    color="info"
                    fullWidth
                    error={Boolean(errors?.password)}
                    helperText={
                      errors?.password?.message
                        ? errors.password.message
                        : 'Uma senha, que não pode ser igual seu email'
                    }
                  />
                )}
              />
            </Grid>
            <Grid container item xs={6} direction="column">
              <Controller
                control={control}
                name="confirm_password"
                rules={{
                  validate: (value) =>
                    value === watch('password') || 'As senhas não são iguais',
                  required: 'Confirmar a senha é obrigatório',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="confirm_password"
                    label="Confirme a senha"
                    type="password"
                    variant="outlined"
                    color="info"
                    fullWidth
                    error={Boolean(errors?.confirm_password)}
                    helperText={
                      errors?.confirm_password?.message
                        ? errors.confirm_password.message
                        : 'Para conferir, digite novamente a senha'
                    }
                  />
                )}
              />
            </Grid>
            <Grid container item xs={12} direction="column">
              <Controller
                control={control}
                name="groups"
                rules={{ required: 'Selecione 1 grupo' }}
                render={({ field }) => {
                  return (
                    <Select
                      ref={field.ref}
                      options={groupOptions}
                      onChange={(val) => field.onChange(val)}
                      defaultValue={selectedGroup}
                      className={clsx(
                        'no-ring focus:ring-transparent focus:border-indigo-500 input input-bordered flex-1 block w-full rounded sm:text-sm',
                        errors.groups ? 'border-error' : 'border-gray-300'
                      )}
                      classNamePrefix="rs"
                      id="groups"
                      name="groups"
                      placeholder="Selecione 1 grupo"
                      noOptionsMessage={({ inputValue }) =>
                        'Sem opções com a busca ' + inputValue
                      }
                    />
                  )
                }}
              />
            </Grid>
            <GridActions container item xs={12} direction="row">
              <Button
                variant="contained"
                color="success"
                type="submit"
                {...(mutation.isLoading ? 'disabled' : null)}
              >
                Criar
              </Button>
              <Button variant="outlined" color="error" type="reset">
                Apagar tudo
              </Button>
            </GridActions>
          </Grid>
        </form>
      </TabPanel>
    </>
  )
}
