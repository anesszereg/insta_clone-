import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from '../../assets/images.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/UserSlice';

function Login() {
  // State for email (or username) and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const  navigate = useNavigate()

  // Handle changes in the email/username input
  const handleemailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle changes in the password input
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const dispatch = useDispatch();
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    console.log(email ,password);

    try {
      //Todo Axios API call to authenticate the user
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email:email,
        password:password,
      });

      // Handle successful login, e.g., redirect to the dashboard
      console.log('Login successful', response.data);


      dispatch(login(response.data.user) )
    navigate('/Home')


    } catch (error) {
      // Handle login failure
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Logo" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Phone number, username, or email"
              value={email}
              onChange={handleemailChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {/* {error && <p className="error">{error}</p>}
             */}


             {error ? <p className="error">{error}</p> : null}
            <button type="submit">Log In</button>
          </form>
          <div className="or-divider">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <button className="login-with-facebook">Log in with Facebook</button>
          <a href="/forgot-password" className="forgot-password">Forgot password?</a>
        </div>
        <div className="sign-up-box">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
