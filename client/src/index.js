import React,{ useState,useEffect } from 'react';
import { createRoot } from "react-dom/client";
import App from "./app";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  { store,persistor } from "./reducer/store";
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>,

  </React.StrictMode>,
  document.getElementById("root"),
);
