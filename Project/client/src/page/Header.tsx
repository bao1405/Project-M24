import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../components/UserContext';

const Header: React.FC = () => {
  const { user, isLoggedIn, logout } = useUserContext();

  return (
    <div>
      <nav className="bg-white p-4 text-black">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="font-bold">
              <Link to="/home">
                <img src="https://s3.cloud.cmctelecom.vn/tinhte1/2013/05/3368536_InstagramLogo-730x278.png" alt="Instagram Logo" />
              </Link>
            </div>
            <div className="flex">
              {isLoggedIn ? (
                <>
                  <div className="nav-link mr-4">{user?.username}</div> {/* Display username */}
                  <button onClick={logout} className="nav-link">Logout</button> {/* Logout button */}
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    <i className="fas fa-book mr-2"></i> Login
                  </Link>
                  <Link to="/register" className="nav-link">
                    <i className="fas fa-cogs mr-2"></i> Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
