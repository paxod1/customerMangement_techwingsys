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
    
        </div>
      </div>
    </div>
  )
}

export default AdminLogin