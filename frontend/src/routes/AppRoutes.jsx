import React from 'react'
import { Routes,Route } from 'react-router-dom'
import TestApi from '../pages/TestApi'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import AuthPage from '../pages/Auth/AuthPage'
import UserDashboard from '../pages/User/UserDashboard'
import PanditDashboard from '../pages/Pandit/PanditDashboard'
import UserProfile from '../pages/User/UserProfile'
import PageNotFound from '../compoments/PageNotFound'
import Home from '../pages/Home'
import PanditList from '../pages/Pandit/PanditList'
import PanditDetails from '../pages/Pandit/PanditDetails'
import Booking from '../pages/Booking/Booking'
import PanditProfile from '../pages/Pandit/PanditProfile'
import About from '../pages/About'
import Contact from '../pages/Contact'

function AppRoutes() {
  return (
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
        <Route path="/test" element={<TestApi/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/auth" element={<AuthPage />} />


        <Route path="/user-dashboard" element={<UserDashboard/>}/>
         <Route path="/user-profile"element={<UserProfile/>}/>


      {/* panditlist */}
      <Route path="/pandits" element={<PanditList />} />
      {/* specific pandit details */}
        <Route path="/pandits/:id" element={<PanditDetails/>} />
      
        <Route path="/pandit-dashboard" element={<PanditDashboard/>} />
        <Route path="/pandit-profile" element={<PanditProfile />}/>
        
        <Route path="*"element={<PageNotFound/>}/>


        {/* booking */}
        <Route path="/my-bookings" element={< Booking/>}/>
    </Routes>
  )
}

export default AppRoutes
