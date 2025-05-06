import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import LOGIN from "./pages/LOGIN"
import HOME from "./pages/HOME"
// import LOGOUT from "./pages/LOGOUT"
import REGISTER from "./pages/REGISTER"
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function  Logout(){
  localStorage.clear()
  return <Navigate to='/login/'/>
}

function RegisterAndLogout(params) {
  localStorage.clear()
  return <REGISTER />
}

function App() {
  return (
  
    <BrowserRouter>
    <Routes>
      <Route
      path='/'
      element={
        <ProtectedRoute>
          <HOME/>
        </ProtectedRoute>
      }
      />
      <Route path='/login' element={<LOGIN/>} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<RegisterAndLogout/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App