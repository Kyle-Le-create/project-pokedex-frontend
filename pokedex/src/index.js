import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/Components/App/App.jsx";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
