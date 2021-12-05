import { Box, Typography } from '@mui/material'
import React from 'react'

type TabPanelProps = {
  index: number
  value: number
}
export default function TabPanel({
  children,
  value,
  index,
  ...other
}: React.PropsWithChildren<TabPanelProps>) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}
