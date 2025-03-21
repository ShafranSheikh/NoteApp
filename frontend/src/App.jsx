import React from 'react'
import Notes from './components/Notes'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} /> 
        <Route path='/todo' element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>} 
        />
      </Routes>
      
    </Router>
    </>
  )
}

export default App
