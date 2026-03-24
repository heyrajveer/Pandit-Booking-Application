
import { ToastContainer } from 'react-toastify'
import './App.css'
import AuthPage from './pages/Auth/AuthPage'
import Register from './pages/Auth/Register'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './compoments/Navbar'
import Footer from './pages/footer'

function App() {


  return (
    <BrowserRouter>
    <ToastContainer/> 
     <Navbar/>
     <AppRoutes/>
     {/* <AuthPage/> */}
      <Footer/>
    </BrowserRouter>
  )
}

export default App
