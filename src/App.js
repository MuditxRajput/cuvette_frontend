// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './authPages/LoginForm';
import SignupForm from './authPages/signUp';
import VerifyPage from './authPages/verifyPage';
import Header from './components/Header';
import Homepage from './components/Homepage';
const App = () => {
  const token = localStorage.getItem("token");
 
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/home' element={<Homepage/>} />
          <Route path='/' element={token?   <Homepage/> : <SignupForm/> } />
          <Route path='/verifyPage' element={<VerifyPage />} /> 
          <Route path='/login'  element={<LoginForm/> }/>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
