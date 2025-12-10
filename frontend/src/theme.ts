import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FC8019',
    },
    secondary: {
      main: '#282C3F',
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                borderRadius: 5,
            }
        }
    },
    MuiSelect: {
        styleOverrides: {
            root: {
                borderRadius: 5,
            }
        }
    }
  },
});

export default theme;
