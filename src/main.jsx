import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./actions/index.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer position="top-right" toastStyle={{ fontSize: "14px" }} autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />
    <App />
  </Provider>
);
