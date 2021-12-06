import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material'
import {
  GridCellEditCommitParams,
  GridColDef,
  GridSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid'
import { GetStaticProps } from 'next'
import * as React from 'react'
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
  useProductTypes,
  useUnitMeasures,
} from '~/helpers/hooks'
import {
  deleteMultipleProducts,
  editProduct,
  getProductDetails,
} from '~/service/product'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('menuDetails', getProductDetails)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function MenuHome() {
  const { data: pageData, isLoading, isError, error } = useProductDetails()
  const { data: typeData } = useProductTypes()
  const { data: unitData } = useUnitMeasures()
  const queryClient = useQueryClient()
  const { errorMessage } = useError({ isError, error })
  const [isDeleting, setIsDeleting] = React.useState(false)
  const deleteMultiMutation = useMutation(deleteMultipleProducts, {
    onSuccess: () => {
      queryClient.invalidateQueries('productDetails')
      setIsDeleting(false)
    },
  })
  const editMutation = useMutation(editProduct, {
    onSuccess: () => queryClient.invalidateQueries('productDetails'),
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
        flex: 4,
      },
      {
        field: 'type',
        headerName: 'Tipo',
        editable: true,
        width: 300,
        flex: 2,
        valueGetter: (params) => {
          return params.value.name
        },
        type: 'singleSelect',
        valueOptions: typeData ? typeData.results.map((item) => item.name) : [],
      },
      {
        field: 'unit_measure',
        headerName: 'Unidade',
        editable: true,
        width: 300,
        flex: 2,
        valueGetter: (params) => {
          return `${params.value.name} (${params.value.short_name})`
        },
        type: 'singleSelect',
        valueOptions: unitData ? unitData.results.map((item) => item.name) : [],
      },
    ],
    [typeData, unitData]
  )

  function handleDelete() {
    setIsDeleting(true)
    const dataToDelete = rowSelected.map((row) => Number(row))
    deleteMultiMutation.mutate(dataToDelete)
  }

  function handleCellEdit(params: GridCellEditCommitParams) {
    let { id, field, value } = params
    if (!value) return

    if (field === 'type') {
      const objType = typeData?.results.find((type) => type.name === value)
      value = objType ? objType.id.toString() : '1'
    }
    if (field === 'unit_measure') {
      const objUnit = unitData?.results.find((type) => type.name === value)
      value = objUnit ? objUnit.id.toString() : '1'
    }
    const paramsToSend = {
      id: Number(id),
      [field]: value,
    }
    console.log({ params })
    console.log({ paramsToSend })
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
      <TabPanel value={tabIndex} index={0}>
        <Typography style={{ paddingBottom: '1.5em' }}>
          Visualização e edição total dos produtos.
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

MenuHome.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
