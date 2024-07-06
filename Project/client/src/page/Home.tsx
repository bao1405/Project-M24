// InstagramHomePage.tsx
import React, { useState, useEffect } from 'react';
import { fetchPosts, Post } from '../store/Api';
import '../css/Home.css';
import './Header'
const InstagramHomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  const toggleMenu = (menu: string) => {
    // Logic for toggling menu
  };

  return (
    <div className="instagram-homepage">
        <header></header>
      <main>
        <div className="container mx-auto my-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sidebar */}
            <div className="sidebar">
              <button className="btn">+ New</button>
              <ul>
                <li>
                  <a href="#" onClick={() => toggleMenu('dashboard')} className="block py-2">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => toggleMenu('application')} className="block py-2">
                    Application
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => toggleMenu('elements')} className="block py-2">
                    Elements
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => toggleMenu('forms')} className="block py-2">
                    Forms
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => toggleMenu('plugins')} className="block py-2">
                    Plugins
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => toggleMenu('datagrid')} className="block py-2">
                    Datagrid
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => toggleMenu('settings')} className="block py-2">
                    Settings
                  </a>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
              <div className="flex items-center bg-white">
                <h2 className="text-lg font-bold mb-4 mr-4">Dashboard</h2>
                <button className="btn">+ Add Contents</button>
                <div className="flex items-center mr-4">
                  <a href="#" className="text-lg font-bold mb-4 mr-4">
                    <i className="fas fa-cogs mr-1"></i> Settings
                  </a>
                  <div className="font-bold flex">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search contents"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Cards */}
                <div className="card">
                  <i className="fas fa-shopping-bag text-2xl mb-4"></i>
                  <h3 className="font-bold text-lg mb-2">Total sciles</h3>
                  <p className="text-gray-700">1000</p>
                </div>
                <div className="card">
                  <i className="fas fa-gift text-3xl mb-4"></i>
                  <h3 className="font-bold text-lg mb-2">Total Posts</h3>
                  <p className="text-gray-700">500</p>
                </div>
                <div className="card">
                  <i className="fas fa-users text-2xl mb-4"></i>
                  <h3 className="font-bold text-lg mb-2">Total visitors</h3>
                  <p className="text-gray-700">2000</p>
                </div>
                <div className="card">
                  <i className="fas fa-shopping-cart text-3xl mb-4"></i>
                  <h3 className="font-bold text-lg mb-2">Total orders</h3>
                  <p className="text-gray-700">2000</p>
                </div>
              </div>

              {/* Form */}
              <div className="form">
                <h1 className="form-title">Form title</h1>
                <p>
                  Sed tortor, sed velit ridiculus ipsum pharetra locus adio
                  gravida augue enim
                </p>
                <div className="alert">
                  <div className="alert-icon"></div>
                  <span>
                    Senectus malesuada suspendisse bibendum elit amet vitae.
                  </span>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Column 1</th>
                      <th>Column 2</th>
                      <th>Column 3</th>
                      <th>Column 4</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Row 1, Column 1</td>
                      <td>Row 1, Column 2</td>
                      <td>Row 1, Column 3</td>
                      <td>
                        <button className="btn">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                    {/* Thêm các hàng khác tương tự */}
                  </tbody>
                </table>

                <div className="pagination">
                  <ul>
                    <li>
                      <button className="pagination-btn">1</button>
                    </li>
                    <li>
                      <button className="pagination-btn">2</button>
                    </li>
                    <li>
                      <button className="pagination-btn">3</button>
                    </li>
                    <li>
                      <button className="pagination-btn">4</button>
                    </li>
                    <li>
                      <button className="pagination-btn">5</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <nav>
          <ul>
            <li>IGTV</li>
            <li>Shop</li>
            <li>Insights</li>
          </ul>
        </nav>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Instagram. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default InstagramHomePage;
