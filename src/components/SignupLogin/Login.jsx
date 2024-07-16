import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      if (user.email === email && user.password === password) {
        navigate('/welcome'); 
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } else {
      alert('No user found. Please sign up first.');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        Log In
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <label>Email: </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='example@gmail.com'
          />
        </div>
        <div className='input'>
          <label>Password: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='*************'
          />
        </div>
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={handleLogin}>Log In</div>
      </div>
      <div className='redirect'>
        <span onClick={() => navigate('/signup')}>Don't have an account? Sign Up</span>
      </div>
    </div>
  );
};

export default Login;
