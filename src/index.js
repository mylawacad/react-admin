import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";

const envName = process.env.NODE_ENV;
if (envName === "development") {
  makeServer({ environment: envName });
}

ReactDOM.render(<App />, document.getElementById("root"));
