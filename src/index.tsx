//React Imports
import React, { FC } from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";

// Redux Imports
import ReduxStore from "./Store";

//Material UI Imports
import Theme from "./Theme";

// Misc Imports
import reportWebVitals from "./reportWebVitals";

const Root: FC = (props) => (
  <React.StrictMode {...props}>
    <ReduxStore>
      <Router>
        <Theme>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </Theme>
      </Router>
    </ReduxStore>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");
if (rootElement?.hasChildNodes()) {
  hydrate(<Root />, rootElement);
} else {
  render(<Root />, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
