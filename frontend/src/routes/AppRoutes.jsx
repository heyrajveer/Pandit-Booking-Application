import React from 'react'
import { Routes,Route } from 'react-router-dom'
import TestApi from '../pages/TestApi'

function AppRoutes() {
  return (
    <Routes>
        <Route path="/test" element={<TestApi/>}/>
    </Routes>
  )
}

export default AppRoutes
