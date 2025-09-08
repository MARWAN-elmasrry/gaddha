import React from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import "react-toastify/dist/ReactToastify.css";
import ClickSpark from './ClickSpark.jsx';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <ClickSpark
          sparkColor='#53210A'
          sparkSize={10}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
        >
          <h1>Soon</h1>
        </ClickSpark>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

