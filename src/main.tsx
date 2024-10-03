import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HealthInsuranceApp from './HealthInsuranceApp.tsx'
import './styles.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HealthInsuranceApp />
  </StrictMode>,
)
