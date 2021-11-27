import { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    alt: true
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1E1900',
    },
    primary: {
      main: '#fdd835',
      contrastText: '#352A00',
    },
    secondary: {
      main: '#1976d2',
    },
  },
})

const defaultTheme = createTheme()
const originalTheme = createTheme({
  palette: {
    action: {
      selected: '#d42300',
    },
    background: {
      default: '#f5ebdc',
      paper: '#f5ebdc',
    },
    text: {
      primary: '#1E1900',
      secondary: '#352A00',
    },
    secondary: {
      main: '#d42300',
      light: '#dd5e32',
      dark: '#9a0000',
    },
    primary: {
      main: '#fdd835',
      light: '#ffff6b',
      dark: '#c6a700',
    },
  },
  components: {
    MuiAppBar: {
      variants: [
        {
          props: { color: 'alt' },
          style: {
            background: '#1E1900',
          },
        },
      ],
    },
  },
})

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: {
            main: '#fdd835',
          },
          secondary: {
            main: '#1976d2',
          },
          text: {
            primary: '#352A00',
          },
          background: {
            default: '#1E1900',
          },
        }
      : {
          primary: {
            main: '#fdd835',
          },
        }),
  },
})

export { theme, originalTheme, getDesignTokens }
