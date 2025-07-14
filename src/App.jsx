import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import { CommentSection } from 'react-comments-section';
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
