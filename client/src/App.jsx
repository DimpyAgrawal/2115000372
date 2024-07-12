import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';


function App() {
  return (
    <div>
      <ToastContainer/>

        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/signin' element={<SignIn />} />
            <Route exact path='/signup' element={<SignUp />} />
          
          </Routes>

        </BrowserRouter>

    </div>
  )
}

export default App
