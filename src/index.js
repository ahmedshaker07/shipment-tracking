import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Wrapper from "./components/Wrapper";

import "antd/dist/antd.min.css";
import "./App.css";

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.getElementById("root")
);
