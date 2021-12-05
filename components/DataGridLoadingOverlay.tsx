import { LinearProgress } from '@mui/material'
import { styled } from '@mui/system'
import { GridOverlay } from '@mui/x-data-grid'
import React from 'react'

const WrapperStyled = styled('div')`
  position: absolute;
  top: 0;
  width: 100%;
`

export function DataGridLoadingOverlay() {
  return (
    <GridOverlay>
      <WrapperStyled>
        <LinearProgress />
      </WrapperStyled>
    </GridOverlay>
  )
}
