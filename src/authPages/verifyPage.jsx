import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  // State to store OTPs and verification status
  const [otp, setOtp] = useState({
    emailotp: '',
    phoneotp: '',
    token: token, // Ensure token is not null
  });

  // State for verification status
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyOTP = async (otpType) => {
    const body = {
      token: otp.token,
      ...(otpType === 'email' ? { emailotp: otp.emailotp } : { phoneotp: otp.phoneotp }),
    };

    try {
      const response = await fetch('https://cuvette-backend-sv0l.onrender.com/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Send only the relevant OTP
      });

      const val = await response.json();

      if (val.success) {
        if (otpType === 'email') {
          setIsEmailVerified(true);
        } else if (otpType === 'phone') {
          setIsPhoneVerified(true);
        }

        if (val.existedCompany.emailVerify && val.existedCompany.phoneVerify) {
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-md px-8 hidden lg:block">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Platform</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-600">Verify Your Account</h2>

        <div className="mb-6">
          <label htmlFor="emailOTP" className="block text-gray-700 font-medium mb-2">
            Email OTP
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="emailOTP"
              name="emailotp"
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Email OTP"
              onChange={handleChange} 
              value={otp.emailotp} 
            />
            {isEmailVerified && (
              <span className="ml-2 text-green-500">✔️</span> 
            )}
          </div>
          <button
            onClick={() => verifyOTP('email')} // Pass 'email' to verifyOTP
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-2 mt-4 transition duration-200 ease-in-out"
          >
            Verify Email
          </button>
        </div>

        {/* Mobile OTP */}
        <div className="mb-6">
          <label htmlFor="mobileOTP" className="block text-gray-700 font-medium mb-2">
            Mobile OTP
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="mobileOTP"
              name="phoneotp"
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Mobile OTP"
              onChange={handleChange} 
              value={otp.phoneotp} 
            />
            {isPhoneVerified && (
              <span className="ml-2 text-green-500">✔️</span> 
            )}
          </div>
          <button
            onClick={() => verifyOTP('phone')} // Pass 'phone' to verifyOTP
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-2 mt-4 transition duration-200 ease-in-out"
          >
            Verify Mobile
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-500">
            Didn't receive an OTP?{' '}
            <span className="text-purple-600 hover:underline cursor-pointer">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
