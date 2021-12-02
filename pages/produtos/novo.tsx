import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
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
import { createProduct } from '~/service/product'

const GridActions = styled(Grid)`
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  > button {
    margin-right: 20px;
  }
`

export default function NewProduct() {
  const mutation = useMutation(createProduct)
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
  } = useForm<FormNewProductType>({
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

  function onSubmit(data: FormNewProductType) {
    console.log({ data })
    const newData = {
      ...data,
      type: Number(data.type),
      unit_measure: Number(data.unit_measure),
    }
    console.log({ newData })
    mutation.mutate(newData)
  }

  React.useEffect(() => {
    if (mutation.isLoading) {
      toast.loading('Criando produto...')
    } else {
      toast.dismiss()
      if (mutation.isError) {
        toast.error('Erro ocorreu: ' + errorMessage)
      }
      if (mutation.isSuccess) {
        toast.success('Produto criado com sucesso!')
      }
    }
  }, [mutation])

  React.useEffect(() => {
    console.log({ errors })
  }, [errors])

  return (
    <>
      <Typography variant="h4" gutterBottom component="h2">
        Produtos
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="aba de produtos"
        >
          <Tab
            label="Tabela"
            component={LinkButton}
            href="/produtos"
            {...a11yProps(0)}
          />
          <Tab
            label="Criar Produto"
            component={LinkButton}
            href="/produtos/novo"
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
                        : 'O nome do produto. Exemplo: "Alface"'
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
                        : 'Uma descrição do produto, como "Hortaliça folhosa e verde"'
                    }
                  />
                )}
              />
            </Grid>
            <Grid container item xs={12} direction="row">
              <Controller
                control={control}
                name="type"
                rules={{
                  required: 'Tipo de Produto é obrigatório',
                }}
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors.type}>
                    <FormLabel component="legend">Tipo de Produto</FormLabel>
                    <RadioGroup
                      aria-label="tipo de produto"
                      id="type"
                      onChange={field.onChange}
                      value={field.value}
                      color="info"
                      row
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio color="info" />}
                        label="Ingrediente"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio color="info" />}
                        label="Revenda"
                      />
                    </RadioGroup>
                    <FormHelperText error={!!errors.type}>
                      {errors?.type?.message
                        ? errors.type.message
                        : 'Que tipo de produto é esse?'}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid container item xs={12} direction="row">
              <Controller
                control={control}
                name="unit_measure"
                rules={{
                  required: 'Unidade de Medida é obrigatória',
                }}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={!!errors.unit_measure}>
                      Unidade de Medida
                    </FormLabel>
                    <RadioGroup
                      aria-label="unidade de medida"
                      id="unit_measure"
                      onChange={field.onChange}
                      value={field.value}
                      color="info"
                      row
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio color="info" />}
                        label="Unidade (UN)"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio color="info" />}
                        label="Litros (LT)"
                      />
                      <FormControlLabel
                        value={3}
                        control={<Radio color="info" />}
                        label="Kilogramas (KG)"
                      />
                    </RadioGroup>
                    <FormHelperText error={!!errors.unit_measure}>
                      {errors?.unit_measure?.message
                        ? errors.unit_measure.message
                        : 'Defina a quantidade do produto'}
                    </FormHelperText>
                  </FormControl>
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
