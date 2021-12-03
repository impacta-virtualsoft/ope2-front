import DeleteIcon from '@mui/icons-material/Delete'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import {
  DataGrid,
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
import { DataGridLoadingOverlay } from '~/components/DataGridLoadingOverlay'
import Layout from '~/components/Layout'
import LinkButton from '~/components/LinkButton'
import TabPanel from '~/components/TabPanel'
import { useError, useProductDetails, useRecipeDetails } from '~/helpers/hooks'
import {
  deleteMultipleRecipes,
  editRecipe,
  getRecipeDetails,
} from '~/service/recipe'

const DialogStyled = styled(Dialog)`
  > div > div {
    min-width: 30%;
    overflow-y: visible;
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
              <DataGrid
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
                }}
              />
            </Paper>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              style={{
                visibility: rowSelected.length > 0 ? 'visible' : 'hidden',
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
          <Controller
            render={({ field }) => (
              <Autocomplete
                options={autoOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Produto" {...field} />
                )}
              />
            )}
            name={`test.${index}.product`}
            control={control}
          />
          <Controller
            render={({ field }) => <TextField label="Quantidade" {...field} />}
            name={`test.${index}.quantity`}
            control={control}
          />
          <Button
            variant="outlined"
            color="info"
            type="button"
            onClick={() => remove(index)}
          >
            Remover
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outlined"
        color="info"
        onClick={() => append({ firstName: 'bill', lastName: 'luo' })}
      >
        Adicionar
      </Button>
      <Button type="submit" color="info" variant="outlined">
        Confirmar esses
      </Button>
    </form>
  )
}
