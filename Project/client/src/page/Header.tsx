import React from 'react'
import {Routes, Route,Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
export default function Header() {
  return (
    <div>
        <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
          <div className="font-bold"><Link to="/"><img src="https://s3.cloud.cmctelecom.vn/tinhte1/2013/05/3368536_InstagramLogo-730x278.png" alt="" /></Link></div>
            <div className="flex">
              <a href="#" className="nav-link">
                <i className="fas fa-book mr-2"></i> <Link to="/login">Login</Link>
              </a>
              <a href="#" className="nav-link">
                <i className="fas fa-cogs mr-2"></i> <Link to="/login">Register</Link>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
    
  )
}
