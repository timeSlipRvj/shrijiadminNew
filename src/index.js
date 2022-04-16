import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import Store from './Redux/Store'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from './Utils/Error';

ReactDOM.render(
  <Provider store={Store}>
  <React.StrictMode>
    <Error>
    <App />
    </Error>
  </React.StrictMode>
  <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
  </Provider>,
  document.getElementById('root')
);

