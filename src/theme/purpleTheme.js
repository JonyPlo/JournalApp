import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#262254',
    },
    secondary: {
      main: '#543084',
    },
    error: {
      main: red.A400, // A400 es la intensidad del color
    },
  },
});
