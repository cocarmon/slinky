import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MazeProvider } from './context/MazeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MazeProvider>
      <App />
    </MazeProvider>
  </StrictMode>,
)
