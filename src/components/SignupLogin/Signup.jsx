import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!email.includes('@') || !email.endsWith('.com')) {
      alert('Please enter a valid email');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long, contain at least one uppercase letter and one number.');
      return;
    }

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
          <input
            id='signup-email'
            type='email'
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input'>
          <label>Password: </label>
          <input
            id='signup-password'
            type='password'
            placeholder='*************'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={handleSignUp}>Sign Up</div>
      </div>
    </div>
  );
};

export default Signup;
