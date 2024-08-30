import React from 'react'
import Navbar from './components/navbar'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem('authToken'); 
  return token ? <Element /> : <Navigate to="/login" state={{loginmessage: "Please Login"}} />;
};

const App = () => {

  return (
    <>
    <Router>
            <Navbar />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<ProtectedRoute element={Dashboard} />} />
            </Routes>
        </Router>
    </>
  )
}

export default App