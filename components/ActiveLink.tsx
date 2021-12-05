import { ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type ActiveLinkType = {
  label: string
  href: string
  icon: typeof SvgIcon
}
const ActiveLink = ({ label, href, icon }: ActiveLinkType) => {
  const { asPath } = useRouter()
  const isActive = asPath === href
  const IconComponent = icon

  return typeof href === 'string' ? (
    <Link href={href} passHref>
      <ListItem button key={label} selected={isActive}>
        <ListItemIcon>
          <IconComponent />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </Link>
  ) : (
    <ListItem button key={label} selected={isActive}>
      <ListItemIcon>
        <IconComponent />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
}

export default ActiveLink
