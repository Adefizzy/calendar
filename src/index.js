import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { ThemeProvider } from "styled-components";

import "react-responsive-modal/styles.css";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";
import store from "./store/getStore";
import theme from "./utils/theme";

// import main sass file
import "./sass/app.scss";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
