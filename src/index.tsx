import React from "react";

import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "styles/global.scss";
import App from "./App";

render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
