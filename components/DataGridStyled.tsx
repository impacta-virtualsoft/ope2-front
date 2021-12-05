import { styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export const DataGridStyled = styled(DataGrid)`
  .MuiDataGrid-toolbarContainer {
    background: #dedede;

    button {
      color: ${({ theme }) => theme.palette.common.black};
    }
  }
`
