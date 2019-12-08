import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#6d6d6d',
        main: '#424242',
        dark: '#1b1b1b',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#ffff52',
        main: '#ffd700',
        dark: '#c7a600',
        contrastText: '#000000',
      },
    },
  });

export default theme;