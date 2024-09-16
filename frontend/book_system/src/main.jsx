import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "./theme_config/theme.js"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>

  </StrictMode>,
)
