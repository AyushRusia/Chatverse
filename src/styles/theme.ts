import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { green, orange, purple } from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
export default theme;
