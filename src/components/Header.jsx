import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 
  const handleLogout = () => {
    localStorage.removeItem("token");
      navigate('/login')
  };

  return (
    <div className='flex justify-between px-5 mb-6 mt-1'>
      <div>
        <img src={logo} alt='logo' />
      </div>
      <div className='flex gap-4 justify-center items-center'>
        contact
        {token && (
          <button onClick={handleLogout} className='bg-black text-white px-2 py-1 rounded-lg'>
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
