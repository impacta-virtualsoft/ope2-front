import AddBoxIcon from '@mui/icons-material/AddBox'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import {
  GridCellEditCommitParams,
  GridColDef,
  GridRenderEditCellParams,
  GridSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid'
import { GetStaticProps } from 'next'
import * as React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from 'react-query'
import { CustomNoRowsOverlay } from '~/components/DataGridCustomNoResults'
import { DataGridLoadingOverlay } from '~/components/DataGridLoadingOverlay'
import { DataGridStyled } from '~/components/DataGridStyled'
import Layout from '~/components/Layout'
import LinkButton from '~/components/LinkButton'
import TabPanel from '~/components/TabPanel'
import {
  useError,
  useProductDetails,
  useRecipeDetails,
  useUnitMeasures,
} from '~/helpers/hooks'
import {
  deleteMultipleRecipes,
  editRecipe,
  getRecipeDetails,
} from '~/service/recipe'

const DialogStyled = styled(Dialog)`
  > div > div {
    min-width: 80%;
    min-height: 60%;
    overflow-y: scroll;
  }
`
const DialogContentStyled = styled(DialogContent)`
  overflow-y: visible;
`
const DialogActionsStyled = styled(DialogActions)`
  justify-content: space-between;
`

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('recipeDetails', getRecipeDetails)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function RecipesHome() {
  const { data: pageData, isLoading, isError, error } = useRecipeDetails()
  const queryClient = useQueryClient()
  const { errorMessage } = useError({ isError, error })
  const [isDeleting, setIsDeleting] = React.useState(false)
  const deleteMultiMutation = useMutation(deleteMultipleRecipes, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipeDetails')
      setIsDeleting(false)
    },
  })
  const editMutation = useMutation(editRecipe, {
    onSuccess: () => queryClient.invalidateQueries('recipeDetails'),
  })
  const [rowSelected, setRowSelected] = React.useState<GridSelectionModel>([])
  const [tabIndex, setTabIndex] = React.useState(0)

  const tableColumns: GridColDef[] = React.useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.15,
      },
      {
        field: 'name',
        headerName: 'Nome',
        editable: true,
        width: 200,
        flex: 3,
      },
      {
        field: 'description',
        headerName: 'Descrição',
        editable: true,
        width: 200,
        flex: 5,
      },
      {
        field: 'recipe_product',
        headerName: 'Ingredientes',
        editable: true,
        width: 300,
        flex: 10,
        valueGetter: (params) => {
          let finalText = ''
          params.value.forEach((item: RecipeDetailProductType) => {
            if (item.product.unit_measure.short_name === 'UN') {
              finalText += item.quantity + 'x' + ' ' + item.product.name + ', '
            } else {
              finalText +=
                item.quantity +
                item.product.unit_measure.short_name +
                ' ' +
                item.product.name +
                ', '
            }
          })
          return finalText
        },
        renderEditCell: (params: GridRenderEditCellParams) => {
          console.log({ paramsFromEdit: params })
          // console.log({ filteredOptions })

          const selectedIngredients = params.row.recipe_products
          return (
            <DialogStyled
              open
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogTitle>Ingredientes</DialogTitle>
              <DialogContentStyled>
                <FormAddIngredient selected={selectedIngredients} />
              </DialogContentStyled>
              <DialogActionsStyled>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    params.api.commitCellChange({
                      id: params.id,
                      field: params.field,
                    })
                    params.api.setCellMode(params.id, params.field, 'view')
                  }}
                >
                  Confirmar
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    params.api.setCellMode(params.id, params.field, 'view')
                  }}
                >
                  Cancelar
                </Button>
              </DialogActionsStyled>
            </DialogStyled>
          )
        },
      },
    ],
    []
  )

  function handleDelete() {
    setIsDeleting(true)
    const dataToDelete = rowSelected.map((row) => Number(row))
    deleteMultiMutation.mutate(dataToDelete)
  }

  function handleCellEdit(params: GridCellEditCommitParams) {
    if (!params.value) return
    const paramsToSend = {
      id: Number(params.id),
      [params.field]: params.value,
    }
    editMutation.mutate(paramsToSend)
  }

  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTabIndex(newValue)
  }

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    }
  }

  if (isError) {
    return (
      <div>
        <p>Erro inesperado: {errorMessage}</p>
      </div>
    )
  }

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
      <TabPanel value={tabIndex} index={0}>
        <Typography style={{ paddingBottom: '1.5em' }}>
          Visualização e edição total das receitas.
        </Typography>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <Paper elevation={2}>
              <DataGridStyled
                autoHeight
                autoPageSize
                rows={pageData && pageData.results ? pageData.results : []}
                columns={tableColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                loading={isLoading || isDeleting}
                onCellEditCommit={handleCellEdit}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelectionModel) => {
                  setRowSelected(newSelectionModel)
                }}
                components={{
                  Toolbar: GridToolbar,
                  LoadingOverlay: DataGridLoadingOverlay,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
              />
            </Paper>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={!!!rowSelected.length}
              style={{
                marginTop: '10px',
              }}
            >
              Remover selecionado{rowSelected.length > 1 ? 's' : null}
            </Button>
          </div>
        </div>
        <Typography style={{ paddingTop: '1.5rem' }}>
          Você também pode editar os dados diretamente na tabela clicando 2
          vezes.
        </Typography>
        <Typography>
          Para remover, é só selecionar a linha que quer remover e clicar no
          botão no fim da tabela.
        </Typography>
      </TabPanel>
    </>
  )
}

RecipesHome.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function FormAddIngredient({ selected }: { selected: any }) {
  const { data: unitMeasures } = useUnitMeasures()
  const [unitMeasure, setUnitMeasure] = React.useState()
  const { control, register, handleSubmit } = useForm()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control, name: 'ingredient' }
  )
  const { data: productsData } = useProductDetails()
  const [ingredients, setIngredients] = React.useState<
    ProductDetailType[] | undefined
  >(productsData?.results)
  const [autoOptions, setAutoOptions] = React.useState<
    Partial<ProductDetailType>[] | []
  >([])

  React.useEffect(() => {
    if (productsData && !!productsData.results.length) {
      setIngredients(
        productsData.results.filter((product) => product.type.id === 1)
      )
    }
  }, [productsData])

  React.useEffect(() => {
    if (ingredients && ingredients.length) {
      setAutoOptions(
        ingredients.map((item) => ({ label: item.name, id: item.id }))
      )
    }
  }, [ingredients])

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {fields.map((item, index) => (
        <div key={item.id} style={{ marginBottom: '1.5rem' }}>
          <>
            <Stack direction="row">
              <Controller
                render={({ field }) => (
                  <Autocomplete
                    options={autoOptions}
                    style={{ flexGrow: 5 }}
                    renderInput={(params) => (
                      <TextFieldBigger
                        {...params}
                        {...field}
                        fullWidth
                        label="Produto"
                        color="info"
                      />
                    )}
                  />
                )}
                name={`test.${index}.product`}
                control={control}
              />
              <Controller
                name={`test.${index}.quantity`}
                control={control}
                render={({ field }) => (
                  <TextFieldSmaller
                    label="Quanto?"
                    color="info"
                    style={{ flexGrow: 1 }}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name={`test.${index}.unit_measure`}
                render={({ field }) => {
                  return (
                    <TextField
                      select
                      label="Unidade"
                      color="info"
                      defaultValue={1}
                      style={{ flexGrow: 3 }}
                      {...field}
                    >
                      {unitMeasures?.results.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                          {unit.name} ({unit.short_name})
                        </MenuItem>
                      ))}
                    </TextField>
                  )
                }}
              />
              <IconButton
                color="error"
                type="button"
                onClick={() => remove(index)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Stack>
          </>
        </div>
      ))}
      <Stack spacing={2} direction="row">
        <Button
          type="button"
          variant="contained"
          color="secondary"
          startIcon={<AddBoxIcon />}
          onClick={() =>
            append({ product: '', quantity: '', unit_measure: '' })
          }
        >
          Ingrediente
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={!!!fields.length}
          startIcon={<CheckBoxIcon />}
        >
          Adicionar todos
        </Button>
      </Stack>
    </form>
  )
}

const TextFieldSmaller = styled(TextField)`
  width: 100px;
`
const TextFieldBigger = styled(TextField)`
  min-width: 300px;
`
