import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from './Utils/filterslice.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>


    <BrowserRouter>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode>,

    </BrowserRouter>
  </Provider>
)
