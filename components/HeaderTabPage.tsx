import { Box, Tabs, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'

type HeaderTabPageProps = {
  title: string
}
export default function HeaderTabPage({
  title,
  children,
}: PropsWithChildren<HeaderTabPageProps>) {
  const [tabIndex, setTabIndex] = React.useState(0)

  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTabIndex(newValue)
  }

  return (
    <>
      <Typography variant="h4" gutterBottom component="h2">
        {title}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label={`aba de ${title.toLowerCase()}`}
        >
          {children}
        </Tabs>
      </Box>
    </>
  )
}
