import { ThemeProvider } from "react-jss";
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { addDecorator } from "@storybook/react";
import React from "react";
import theme from "../src/styles/theme";


addDecorator(StoryFn => (
  <MuiThemeProvider theme={createMuiTheme({ ...theme })}>
    <ThemeProvider theme={theme}>
      <StoryFn />
    </ThemeProvider>
  </MuiThemeProvider>
));


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}