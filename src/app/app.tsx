import './app.css';

import MomentUtils from '@date-io/moment';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';

import { Router } from '../router/router';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#5EB030' },
  },
});

export function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
