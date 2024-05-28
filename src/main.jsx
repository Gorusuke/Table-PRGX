import React from 'react'
import ReactDOM from 'react-dom/client'
import { GetDataContext } from './context/DataContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GetDataContext>
      <App />
    </GetDataContext>
  </React.StrictMode>,
)
