import { Box, Button, useColorModeValue } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"

function App() {

  const bg = useColorModeValue('beige', 'gray.700')
  return (
    
      <Box
        minH="100vh"
        bg={bg}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Box>

  )
}

export default App
