import React from "react";
import "./soon.css";
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
          {/* <App /> */}
          <div className="soon">
            <img src="./logo.png" alt="" />
           <h1>قريبا</h1>
          </div>
        </ClickSpark>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

