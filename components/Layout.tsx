import BadgeIcon from '@mui/icons-material/Badge'
import ContactsIcon from '@mui/icons-material/Contacts'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import ReceiptIcon from '@mui/icons-material/Receipt'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import {
  AppBar,
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
import { usePermissions } from '~/helpers/hooks'
import ActiveLink from './ActiveLink'
import Meta from './Meta'

const navMain = [
  { label: 'Início', href: '/', icon: HomeIcon },
  {
    label: 'Clientes',
    href: '/clientes',
    apiKeys: ['client'],
    icon: ContactsIcon,
  },
  {
    label: 'Cardápio',
    href: '/cardapio',
    apiKeys: ['menu'],
    icon: RestaurantMenuIcon,
  },
  {
    label: 'Produtos',
    href: '/produtos',
    apiKeys: ['product'],
    icon: ProductionQuantityLimitsIcon,
  },
  {
    label: 'Receitas',
    href: '/receitas',
    apiKeys: ['recipe'],
    icon: TextSnippetIcon,
  },
  { label: 'Pedidos', href: '/pedidos', apiKeys: ['user'], icon: ReceiptIcon },
  { label: 'Usuários', href: '/usuarios', apiKeys: ['user'], icon: BadgeIcon },
  // { label: 'Relatórios', href: '/relatorios', icon: AssessmentIcon },
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
  const [navLinks, setNavLinks] = React.useState(navMain)
  const { data: permissionData } = usePermissions()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  React.useEffect(() => {
    console.log({ permissions: permissionData?.permissions })
  }, [permissionData])

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navLinks.map((nav) => (
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
            // width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            // ml: { sm: `${DRAWER_WIDTH}px` },
            width: '100%',
            maxHeight: '64px',
            zIndex: 9999,
          }}
        >
          <Toolbar>
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                // sx={{ mr: 2, display: { sm: 'none' } }}
                sx={{ mr: 2 }}
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
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
            </>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          // sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
          sx={{
            width: mobileOpen ? 0 : { md: DRAWER_WIDTH },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* <Drawer
            color="alt"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              // display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 200,
              },
            }}
          >
            {drawer}
          </Drawer> */}
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
                display: { xs: 'block', md: 'none' },
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
                display: { xs: 'none', md: 'block' },
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
