
import { ToastContainer } from 'react-toastify'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './compoments/Navbar'
import Footer from './pages/Footer'
import ChatWidget from './compoments/ChatWidget'
import BackButton from './compoments/BackButton'

function App() {


  return (
    <BrowserRouter>
    <ToastContainer/> 
     <Navbar/>
     <BackButton/>
     <AppRoutes/>
     {/* <AuthPage/> */}
      <Footer/>
      <ChatWidget/>
    </BrowserRouter>
  )
}

export default App
