import React, { useState } from 'react';
import './Signup.css';
import logo from "../../assets/images.png"
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { signup } from '../../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  // Create data state
  const [data, setData] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: ""
  });

  const [error, setError] = useState('')


  // dispatch data to the backend

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Function to create new user in DB
  const createUser = async (e) => {

    // validate the form
   e.preventDefault();


    if (!data.email || !data.fullName || !data.userName || !data.password) {
      setError('Please fill in all fields.');
      return;
    }




 

    try {
      console.log('hello');

      const res = await axios.post("http://localhost:3000/api/users/register", {
        email: data.email,
        fullname: data.fullName,
        username: data.userName,
        password: data.password,
      });

      console.log(res.data);

      dispatch(signup(res.data.user) )

      navigate('/Home')



    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <div className="signup-box">
          <img src={logo} alt="Logo" />
          <button className="signup-with-facebook">Log in with Facebook</button>
          <div className="or-divider">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <form onSubmit={createUser}>
            <input 
              value={data.email} 
              onChange={(e) => setData({ ...data, email: e.target.value })} 
              type="text" 
              placeholder="Mobile Number or Email" 
            />
            <input 
              value={data.fullName} 
              onChange={(e) => setData({ ...data, fullName: e.target.value })} 
              type="text" 
              placeholder="Full Name" 
            />
            <input 
              value={data.userName} 
              onChange={(e) => setData({ ...data, userName: e.target.value })} 
              type="text" 
              placeholder="Username" 
            />
            <input 
              value={data.password} 
              onChange={(e) => setData({ ...data, password: e.target.value })} 
              type="password" 
              placeholder="Password" 
            />

            {error ? <p className="error">{error}</p> : null}
            <button type="submit">Sign Up</button>
          </form>
          <p className="terms">
            By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookies Policy</a>.
          </p>
        </div>
        <div className="login-box">
          <p>Have an account? <a href="/">Log in</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
