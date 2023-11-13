import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Dashboard from './pages/dashboard/Dashboard';
import Results from './pages/results/Results';
import Details from './pages/details/Details';
import Error from './pages/error/Error';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/results" element={<Results/>} />
          <Route path="/company/details" element={<Details/>} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;