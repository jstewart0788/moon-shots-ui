import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#616782',
        main: '#262F54',
        dark: '#394163',
        contrastText: '#FFF',
      },
      secondary: {
        light: '#E73440',
        main: '#E5202D',
        dark: '#D11E29',
        contrastText: '#FFF',
      },
    },
  });

export default theme;