import React from 'react'
import {Routes, Route,Link} from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Header from './page/Header';

export default function App() {
  return (
    
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  )
}