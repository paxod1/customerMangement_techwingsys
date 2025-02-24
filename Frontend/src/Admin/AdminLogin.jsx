import React, { useState } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import  {useDispatch}from 'react-redux'
import { loginAdmin } from './API_Calling_Admin/API';


function AdminLogin() {
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const dispatch=useDispatch()


  function APIcallLogin(){
    loginAdmin({email,password},dispatch)
  }
  
  return (
    <div>
      <div className="login-container">
        <div className="login-box">
        <h3>Admin login page</h3>
          <div className="login-logo">
          </div>

          <input
            className="login-input"
            type="text"
            placeholder="email"
            onChange={((e)=>setEmail(e.target.value))}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            onChange={((e)=>setPassword(e.target.value))}
          />
          <button className="login-button" onClick={APIcallLogin}>Log In</button>
          <div className="divider">
            <div className="line"></div>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
          <div className="login-with-facebook">
            <img
              className="facebook-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
            />
            <span>Log in with Facebook</span>
          </div>
          <a className="forgot-password" href="#">
            Forgot password?
          </a>
        </div>
        <div className="signup-box">
          <span>Don't have an account?</span>
          <Link to={'/Adminsignup'} >
            <a href="#">Sign up</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin