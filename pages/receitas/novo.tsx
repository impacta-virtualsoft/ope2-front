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
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import LinkButton from '~/components/LinkButton'
import TabPanel from '~/components/TabPanel'
import { groupOptions } from '~/helpers/constants'
import { useError } from '~/helpers/hooks'
import { createRecipe } from '~/service/recipe'

const GridActions = styled(Grid)`
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  > button {
    margin-right: 20px;
  }
`

export default function NewRecipe() {
  const mutation = useMutation(createRecipe)
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
  } = useForm<FormNewRecipeType>({
    defaultValues: {
      name: '',
      description: '',
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

  function onSubmit(data: FormNewRecipeType) {
    console.log({ data })
    const newData = {
      ...data,
    }
    console.log({ newData })
    // mutation.mutate(newData)
  }

  React.useEffect(() => {
    if (mutation.isLoading) {
      toast.loading('Criando receita...')
    } else {
      toast.dismiss()
      if (mutation.isError) {
        toast.error('Erro ocorreu: ' + errorMessage)
      }
      if (mutation.isSuccess) {
        toast.success('Receita criado com sucesso!')
      }
    }
  }, [mutation, errorMessage])

  React.useEffect(() => {
    console.log({ errors })
  }, [errors])

  return (
    <>
      <Typography variant="h4" gutterBottom component="h2">
        Receitas
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="aba de receitas"
        >
          <Tab
            label="Tabela"
            component={LinkButton}
            href="/receitas"
            {...a11yProps(0)}
          />
          <Tab
            label="Criar Receita"
            component={LinkButton}
            href="/receitas/novo"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid container item xs={12} direction="column">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: 'Nome é obrigatório',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="name"
                    label="Nome"
                    variant="outlined"
                    color="info"
                    fullWidth
                    error={!!errors?.name}
                    helperText={
                      errors?.name?.message
                        ? errors.name.message
                        : 'O nome da receita. Exemplo: "Dionísio"'
                    }
                  />
                )}
              />
            </Grid>
            <Grid container item xs={12} direction="column">
              <Controller
                control={control}
                name="description"
                rules={{
                  required: 'Descrição é obrigatória',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="description"
                    label="Descrição"
                    variant="outlined"
                    color="info"
                    fullWidth
                    multiline
                    minRows="3"
                    error={!!errors?.description}
                    helperText={
                      errors?.description?.message
                        ? errors.description.message
                        : 'Uma descrição da receita. Exemplo: "Um hamburguer dos deuses: hamburger de 200g, alface, maionese caseira no pão de gergelim."'
                    }
                  />
                )}
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
