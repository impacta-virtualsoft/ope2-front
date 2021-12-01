import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  Paper,
  styled,
  Tab,
  TablePagination,
  Tabs,
  Typography,
} from '@mui/material'
import {
  DataGrid,
  GridCellEditCommitParams,
  GridColDef,
  GridOverlay,
  gridPaginationSelector,
  GridRenderEditCellParams,
  GridSelectionModel,
  GridToolbar,
  GridValueFormatterParams,
  GridValueSetterParams,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import clsx from 'clsx'
import { GetStaticProps } from 'next'
import * as React from 'react'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from 'react-query'
import Select from 'react-select'
import Layout from '~/components/Layout'
import LinkButton from '~/components/LinkButton'
import TabPanel from '~/components/TabPanel'
import { groupOptions } from '~/helpers/constants'
import { useError, useUsers } from '~/helpers/hooks'
import { deleteMultipleUsers, editUser, getUsers } from '~/service/user'

const BoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 2px solid #000;
  box-shadow: 24;
  padding: 40px;
`
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
const DataGridStyled = styled(DataGrid)`
  /* & .MuiDataGrid-toolbarContainer button {
    color: ${({ theme }) => theme.palette.primary.dark};
  } */
  /* border: 1px solid ${({ theme }) => theme.palette.grey[400]}; */
`
const GridActions = styled(Grid)`
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  > button {
    margin-right: 20px;
  }
`
const FormContainerStyled = styled('div')`
  max-width: 600px;
  display: flex;
  flex-direction: column;

  > div {
    flex: 1;
  }
`

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('users', getUsers)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const User = () => {
  const { data: users, isLoading, isError, isFetching, error } = useUsers()
  const queryClient = useQueryClient()
  const { errorMessage } = useError({ isError, error })
  const [isDeleting, setIsDeleting] = React.useState(false)
  const deleteMultiMutation = useMutation(deleteMultipleUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      setIsDeleting(false)
    },
  })
  const editMutation = useMutation(editUser, {
    onSuccess: () => queryClient.invalidateQueries('users'),
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
        field: 'first_name',
        headerName: 'Nome',
        editable: true,
        width: 200,
        flex: 3,
      },
      {
        field: 'last_name',
        headerName: 'Sobrenome',
        editable: true,
        width: 200,
        flex: 3,
      },
      {
        field: 'email',
        headerName: 'Email',
        editable: true,
        width: 300,
        flex: 5,
      },
      {
        field: 'groups',
        headerName: 'Grupos (ID)',
        editable: true,
        flex: 5,
        valueFormatter: (params: Partial<GridValueFormatterParams>) => {
          if (params.field === 'groups') {
            // console.log({ paramsFromFormatter: params })
            const groups = groupOptions
              .filter((option) =>
                (params.value as number[]).includes(option.value)
              )
              .map((group) => `${group.label} (${group.value})`)
              .join(', ')
            // console.log({ groups })
            return groups
          }
        },
        renderEditCell: (params: GridRenderEditCellParams) => {
          // console.log({ paramsFromEdit: params })
          const filteredOptions = groupOptions.filter((option) =>
            (params.value as number[]).includes(option.value)
          )
          // console.log({ filteredOptions })
          return (
            <DialogStyled
              open
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogTitle>Grupos</DialogTitle>
              <DialogContentStyled>
                <Select
                  id="groups"
                  name="groups"
                  options={groupOptions}
                  defaultValue={filteredOptions}
                  classNamePrefix="rs"
                  placeholder="Selecione pelo menos 1 grupo..."
                  noOptionsMessage={({ inputValue }) =>
                    'Sem opções com a busca ' + inputValue
                  }
                  className={clsx(
                    'no-ring focus:ring-transparent focus:border-indigo-500 input input-bordered flex-1 block w-full rounded sm:text-sm'
                  )}
                  isMulti
                  onChange={(selected) => {
                    const newValue = selected.map((option) => option.value)
                    params.api.setEditCellValue({
                      id: params.id,
                      field: params.field,
                      value: newValue,
                    })
                  }}
                />
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
        valueSetter: (params: GridValueSetterParams) => {
          // console.log({ paramsFromSetter: params })
          return params.row
        },
      },
    ],
    []
  )

  // const handleDelete = async (id: UserType['id']) => {
  //   deleteMutation.mutate(id)
  // }

  function handleDelete() {
    setIsDeleting(true)
    console.log('Vou remover esses:')
    console.log({ rowSelected })
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
      <TabPanel value={tabIndex} index={0}>
        <Typography style={{ paddingBottom: '1.5em' }}>
          Visualização e edição total dos usuários.
        </Typography>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <Paper elevation={2}>
              <DataGridStyled
                autoHeight
                autoPageSize
                rows={users && users.results ? users.results : []}
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
                  LoadingOverlay: CustomLoadingOverlay,
                  // Pagination: CustomPagination,
                  // Footer: CustomFooterDataGrid,
                }}
                componentsProps={{
                  footer: { rowSelected },
                }}
                // localeText={gridLocaleText}
                // hideFooterPagination
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

User.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function CustomPagination() {
  const apiRef = useGridApiContext()
  const paginationState = useGridSelector(apiRef, gridPaginationSelector)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  function handlePageChange(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    apiRef.current.setPage(newPage)
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10))
    apiRef.current.setPage(0)
  }

  return (
    <>
      <TablePagination
        component="div"
        count={paginationState.pageCount}
        page={paginationState.page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

type CustomFooterDataGridProps = {
  rowSelected: GridSelectionModel
}
function CustomFooterDataGrid({ rowSelected }: CustomFooterDataGridProps) {
  console.log({ rowSelected })
  if (!rowSelected || rowSelected.length < 0) {
    return null
  }
  return <div>Dados: {JSON.stringify(rowSelected, null, 2)}</div>
}

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  )
}

export default User
