import React from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email, password }));
      navigate('/login');
    } else {
      alert('Please fill out both fields.');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        Sign Up
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <label>Email: </label>
          <input id='signup-email' type='email' placeholder='example@gmail.com' />
        </div>
        <div className='input'>
          <label>Password: </label>
          <input id='signup-password' type='password' placeholder='*************' />
        </div>
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={handleSignUp}>Sign Up</div>
      </div>
    </div>
  );
};

export default Signup;
