import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './assets/index.css'
import './assets/App.css'
import './assets/menu.css'
import './assets/popup.css'

import App from './pages/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
