import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    fullName: '',
    username: '',
    password: '',
    status: true,
    loginstatus: false
    
  });

  const [errors, setErrors] = useState({
    emailOrPhone: '',
    fullName: '',
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation logic
    let hasError = false;
    const newErrors = {
      emailOrPhone: '',
      fullName: '',
      username: '',
      password: ''
    };

    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = 'Mobile Number or Email is required';
      hasError = true;
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
      hasError = true;
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasError = true;
    }

    setErrors(newErrors);
    if (!hasError) {
      // Check if the user already exists
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const users = await response.json();
          const userExists = users.some((user: any) => 
            user.emailOrPhone === formData.emailOrPhone ||
            user.username === formData.username
          );

          if (userExists) {
            setErrors({
              ...newErrors,
              emailOrPhone: 'Email or Phone already exists',
              username: 'Username already exists'
            });
            return;
          }

          // If user does not exist, proceed with registration
          const postResponse = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });

          if (postResponse.ok) {
            console.log('Form submitted successfully', formData);
            navigate('/login');
          } else {
            console.error('Form submission failed');
          }
        } else {
          console.error('Error fetching users');
        }
      } catch (error) {
        console.error('Error checking existing users', error);
      }
    }
  };

  return (
    <div className='SignUpForm'>
      <div className="container mx-auto" style={{ marginTop: '150px' }}>
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-sm w-full">
            <div className="bg-white border border-gray-300 p-6 rounded shadow">
              <div className="mb-6">
                {/* Logo Instagram */}
                <div className="text-center mb-4">
                  <i
                    aria-label="Instagram"
                    style={{
                      backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v3/yM/r/8n91YnfPq0s.png")',
                      backgroundPosition: '0px -52px',
                      backgroundSize: 'auto',
                      width: '175px',
                      height: '51px',
                      backgroundRepeat: 'no-repeat',
                      display: 'inline-block'
                    }}
                  />
                </div>
                {/* Mô tả đăng ký */}
                <form className="space-y-4" method="post" onSubmit={handleSubmit}>
                  <div>
                    <span className="block text-xs font-semibold text-gray-600">Sign up to see photos and videos from your friends.</span>
                  </div>
                  {/* Đăng nhập bằng Facebook */}
                  <div className="flex justify-center">
                    <button
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      <span className="font-semibold">Log in with Facebook</span>
                    </button>
                  </div>
                  {/* Đoạn text "or" */}
                  <div className="flex items-center mt-4 mb-4">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <div className="mx-4 text-gray-500 text-xs">or</div>
                    <div className="border-t border-gray-300 flex-grow"></div>
                  </div>
                  {/* Các input form */}
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600" htmlFor="emailOrPhone">Mobile Number or Email</label>
                      <input
                        type="text"
                        id="emailOrPhone"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        className={`block w-full mt-1 px-3 py-2 border ${errors.emailOrPhone ? 'border-red-500' : 'border-gray-300'} rounded-sm focus:outline-none focus:border-blue-500`}
                        autoComplete="tel"
                      />
                      {errors.emailOrPhone && <p className="text-red-500 text-xs mt-1">{errors.emailOrPhone}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600" htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`block w-full mt-1 px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-sm focus:outline-none focus:border-blue-500`}
                        autoComplete="name"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600" htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`block w-full mt-1 px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-sm focus:outline-none focus:border-blue-500`}
                        autoComplete="username"
                      />
                      {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600" htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`block w-full mt-1 px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-sm focus:outline-none focus:border-blue-500`}
                        autoComplete="new-password"
                      />
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                  </div>
                  {/* Điều khoản và chính sách */}
                  <p className="text-xs text-gray-600">
                    People who use our service may have uploaded your contact information to Instagram.{' '}
                    <a
                      href="https://www.facebook.com/help/instagram/261704639352628"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Learn More
                    </a>
                    <br />
                    By signing up, you agree to our{' '}
                    <a href="https://help.instagram.com/581066165581870/?locale=en_US" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Terms
                    </a>
                    ,{' '}
                    <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="/legal/cookies/" target
                        ="_blank" rel="noopener noreferrer" className="text-blue-500 hover
                      ">
                      Cookies Policy
                    </a>
                    .
                  </p>
                  {/* Nút Sign up */}
                  <div>
                  <button
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      type="submit"
                    >
                    <span className="font-semibold">Sign up</span>
                  </button>
                  <div className="_ab21" style={{textAlign:"center", marginTop:"20px"}}>
                      <p className="_ab25">
                        Don't have an account?{' '}
                        <a className="text-blue-600" href="/login" role="link" tabIndex={0}>
                          Sign up
                        </a>
                      </p>
                  </div>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;