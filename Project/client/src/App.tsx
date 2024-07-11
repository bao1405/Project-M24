// App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import AdminPage from './page/Admin';
import LoginAdmin from './page/LoginAdmin';
import Profile from './page/Profile';
import User from './page/user'; 

export default function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path='/loginadmin' element={<LoginAdmin />} />
        <Route path='/profile' element={<Profile />} />
        {/* Dynamic route for displaying user details */}
        <Route path="/user/:id" element={<User/>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
