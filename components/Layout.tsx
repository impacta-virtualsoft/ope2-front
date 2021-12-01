import AssessmentIcon from '@mui/icons-material/Assessment'
import BadgeIcon from '@mui/icons-material/Badge'
import ContactsIcon from '@mui/icons-material/Contacts'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ReceiptIcon from '@mui/icons-material/Receipt'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import {
  AppBar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { signOut } from 'next-auth/react'
import * as React from 'react'
import LogoDH from '~/assets/images/logo-divina-symbol.svg'
import { DRAWER_WIDTH } from '~/helpers/constants'
import ActiveLink from './ActiveLink'
import Meta from './Meta'

const navMain = [
  { label: 'Início', href: '/', icon: HomeIcon },
  { label: 'Cardápio', href: '/cardapio', icon: RestaurantMenuIcon },
  { label: 'Pedidos', href: '/pedidos', icon: ReceiptIcon },
  { label: 'Clientes', href: '/clientes', icon: ContactsIcon },
  { label: 'Relatórios', href: '/relatorios', icon: AssessmentIcon },
  { label: 'Usuários', href: '/usuarios', icon: BadgeIcon /*PeopleAltIcon*/ },
]
const navUser = [
  {
    label: 'Perfil',
    href: '/profile',
  },
  {
    label: 'Ajustes',
    href: '/settings',
  },
  {
    label: 'Sair',
    href() {
      signOut()
    },
  },
]

const MainBox = styled(Box)`
  flex-grow: 1;
  height: 100vh;
  overflow: 'auto';
  /* background-color: ${({ theme }) =>
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[900]}; */
`

const Header = styled('header')`
  position: 'sticky';
  top: 0;
  transition: ${({ theme }) => theme.transitions.create('top')};
  z-index: ${({ theme }) => theme.zIndex.appBar};
  backdrop-filter: 'blur(20px)';
  box-shadow: inset 0px -1px 1px ${({ theme }) => (theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100])};
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.grey[900], 0.72)
      : 'rgba(255,255,255,0.72)'};
`

const Layout: React.FC = ({ children }) => {
  const [title, setTitle] = React.useState('Divina Hamburgueria')

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navMain.map((nav) => (
          <ActiveLink
            label={nav.label}
            href={nav.href}
            icon={nav.icon}
            key={nav.label}
          />
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  )

  return (
    <>
      <Meta />
      <MainBox sx={{ display: 'flex' }}>
        <AppBar
          color="secondary"
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
            maxHeight: '64px',
          }}
        >
          <Toolbar>
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <LogoDH height={32} />
              <Typography
                sx={{ marginLeft: '12px', flexGrow: 1 }}
                variant="h6"
                component="h1"
              >
                Divina Hamburgueria
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {mobileOpen ? (
            <Drawer
              color="alt"
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: DRAWER_WIDTH,
                },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              color="alt"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: DRAWER_WIDTH,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </MainBox>
    </>
  )
}

export default Layout
