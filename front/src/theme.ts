import { createTheme } from '@mui/material/styles';

const hoverOpacity = 0.2

const theme = createTheme({
  palette: {
    primary: {
      light: 'hsla(22, 17%, 22%, 1)',
      main: 'hsla(22, 17%, 12%, 1)',
      dark: 'hsla(22, 17%, 2%, 1)',
      contrastText: 'hsla(22, 17%, 100%, 1)',
    },
    secondary: {
      light: 'hsla(30, 3%, 66%, 1)',
      main: 'hsla(30, 3%, 56%, 1)',
      dark: 'hsla(30, 3%, 46%, 1)',
      contrastText: 'hsla(22, 17%, 12%, 1)',
    },
    background: {
      input: 'hsla(210, 50%, 99%, 1)',
    },
    action: {
      focusOpacity: hoverOpacity,
      hoverOpacity: hoverOpacity,
      focus: `hsla(23, 16%, 16%, ${hoverOpacity})`,
      hover: `hsla(23, 16%, 16%, ${hoverOpacity})`,
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '30px',
      lineHeight: '35px',
      letterSpacing: '0.3px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '21px',
      letterSpacing: '0.4px',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.3px',
    },
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const color = ownerState.color === 'inherit' ? 'primary' : ownerState.color || 'primary'
          return {
            fontWeight: 700,
            '&:hover': {
              backgroundColor: theme.palette[color].light,
              color: theme.palette[color].contrastText,
            },
            ...(ownerState.variant === 'outlined' && {
              borderWidth: 2,
              borderColor: theme.palette[color].main,
              padding: '4px 14px',
              boxShadow: '0px 4px 12px hsla(22, 17%, 12%, 0.2), 0px 4px 12px inset hsla(22, 17%, 12%, 0.2)',
              textShadow: '0 4px 6px hsla(22, 17%, 12%, 0.2)',
              '&:hover': {
                borderWidth: 2,
                borderColor: theme.palette[color].light,
                backgroundColor: theme.palette[color].light,
                color: theme.palette[color].contrastText,
                boxShadow: '0px 4px 12px hsla(22, 17%, 12%, 0.2), 0px 4px 12px inset hsla(22, 17%, 12%, 0.2)',
              },
            }),

            ...(ownerState.variant === 'contained' && {
              boxShadow: '0px 4px 12px hsla(22, 17%, 12%, 0.2)',
              '&:hover': {
                boxShadow: '0px 4px 12px hsla(22, 17%, 12%, 0.2), 0px 4px 12px inset hsla(22, 17%, 12%, 0.2)',
                backgroundColor: theme.palette[color].light,
                color: theme.palette[color].contrastText,
              }
            }),
            
            ...(ownerState.variant === 'text' && {
              '&:hover': {
                boxShadow: '0px 4px 12px hsla(22, 17%, 12%, 0.2)',
                backgroundColor: theme.palette[color].light,
                color: theme.palette[color].contrastText,
              }
            }),
          }
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined',
      },
      styleOverrides: {
        outlined: {
          border: '1px solid hsla(22, 17%, 12%, 0.5)'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: () => {
          const color = theme.palette.primary.light
          return {
            backgroundColor: color,
            borderRadius: '2px',
            textTransform: 'uppercase',
            padding: '10px 20px 10px 10px',
            boxShadow: `0px 0px 0px 1px hsl(0, 0%, 100%, 0.1), 0px 0px 0px 2px ${color}`,
          }
        },
        arrow: () => {
          const color = theme.palette.primary.light
          return {
            '&::before': {
              backgroundColor: color,
              backgroundImage: 'linear-gradient(0deg, hsl(0, 0%, 100%, 0.1), hsl(0, 0%, 100%, 0.1))',
            }
          }
        }
      }
    }
  }
})

export default theme
