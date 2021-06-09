import React from 'react';
import { ThemeProvider } from 'react-jss';
import theme from 'styles/theme';

const App = () => {
  return (
  <ThemeProvider theme={theme}>
    <div></div>
  </ThemeProvider>
  );
}

export default App;