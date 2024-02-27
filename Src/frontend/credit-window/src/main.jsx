import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { routes } from "./router/routes.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>
)
