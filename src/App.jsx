import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Edit from './pages/Edit'
import View from './pages/View'
import Add from './pages/Add'
 import { ToastContainer, toast } from 'react-toastify';
import Error from './pages/Error'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
 
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<View/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        {/* Not Found Page */}
        <Route path="*" element={<Error/>}/>
      </Routes>
      <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
