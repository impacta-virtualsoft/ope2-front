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
import { useClients, useError } from '~/helpers/hooks'
import { deleteMultipleClients, editClient, getClients } from '~/service/client'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('clients', getClients)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function ClientesHome() {
  const { data: pageData, isLoading, isError, error } = useClients()
  const queryClient = useQueryClient()
  const { errorMessage } = useError({ isError, error })
  const [isDeleting, setIsDeleting] = React.useState(false)
  const deleteMultiMutation = useMutation(deleteMultipleClients, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients')
      setIsDeleting(false)
    },
  })
  const editMutation = useMutation(editClient, {
    onSuccess: () => queryClient.invalidateQueries('clients'),
  })
  const [rowSelected, setRowSelected] = React.useState<GridSelectionModel>([])
  const [tabIndex, setTabIndex] = React.useState(0)

  const tableColumns: GridColDef[] = React.useMemo(
    () => [
      // {
      //   field: 'id',
      //   headerName: 'ID',
      //   flex: 0.15,
      // },
      {
        field: 'name',
        headerName: 'Nome',
        editable: true,
        width: 200,
        flex: 3,
      },
      {
        field: 'cpf',
        headerName: 'CPF',
        editable: true,
        width: 200,
        flex: 4,
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
    let { id, field, value } = params
    if (!value) return
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
        Clientes
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="aba de clientes"
        >
          <Tab
            label="Tabela"
            component={LinkButton}
            href="/clientes"
            {...a11yProps(0)}
          />
          <Tab
            label="Criar Cliente"
            component={LinkButton}
            href="/clientes/novo"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <Typography style={{ paddingBottom: '1.5em' }}>
          Visualização e edição total dos clientes.
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

ClientesHome.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
