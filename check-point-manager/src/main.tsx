
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import myImg from "/images/background.jpg";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
      <img src={myImg} id="imgBackground" alt="background"></img>
  </StrictMode>,
)
