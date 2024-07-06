import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../components/UserContext';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const user = data.find((u: any) => u.username === formData.username && u.password === formData.password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      login(user); // Update the context with the logged-in user

      navigate('/home'); // Navigate to the home page
    } catch (error) {
      console.error('Login error:', (error as Error).message);
      setErrors({ username: 'Invalid credentials', password: 'Invalid credentials' });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <i
            className="bg-instagram-logo bg-no-repeat bg-center w-40 h-12"
            aria-label="Instagram"
            role="img"
            style={{
              backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v3/yM/r/8n91YnfPq0s.png")',
              backgroundPosition: '0px -52px',
              backgroundSize: 'auto',
              width: '175px',
              height: '51px',
              backgroundRepeat: 'no-repeat',
              display: 'inline-block'
            }}
          ></i>
        </div>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="username">
              <span className="text-gray-700">Username</span>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.username ? 'border-red-500' : ''
                }`}
                aria-label="Username"
                autoComplete="off"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              <span className="text-gray-700">Password</span>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                aria-label="Password"
                autoComplete="off"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </label>
          </div>
          <button
            type="submit"
            className="block w-full py-2 px-4 mt-4 mb-4 border border-transparent rounded-md bg-blue-600 text-white font-semibold flex items-center justify-center focus:outline-none hover:bg-blue-700"
          >
            <span className="mr-2"></span>
            <span>Log in</span>
          </button>
          <div className="flex items-center justify-between">
            <div className="border-t border-gray-300 flex-grow"></div>
            <div className="mx-2 text-sm text-gray-500">or</div>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          <button
            type="button"
            className="block w-full py-2 px-4 mt-4 mb-4 border border-transparent rounded-md bg-blue-600 text-white font-semibold flex items-center justify-center focus:outline-none hover:bg-blue-700"
          >
            <span className="mr-2"></span>
            <span>Log in with Facebook</span>
          </button>
          <a
            href="/accounts/password/reset/"
            className="block text-sm text-blue-600 text-center hover:underline focus:outline-none"
            tabIndex={0}
            role="link"
          >
            Forgot password?
          </a>
        </form>
        <div className="flex justify-center mt-6">
          <div className="text-sm text-gray-500">Get the app.</div>
        </div>
        <div className="flex justify-center mt-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D4E0C6186-74E5-49DD-9E4B-DF3BAD20DB10%26utm_campaign%3DunifiedHome%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%253A%252F%252Fwww.instagram.com%252F"
            target="_blank"
            rel="nofollow noreferrer"
            className="mr-2"
          >
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              alt="Get it on Google Play"
              className="h-10"
            />
          </a>
          <a
            href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1366%2C720"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              alt="Get it from Microsoft"
              className="h-10"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
