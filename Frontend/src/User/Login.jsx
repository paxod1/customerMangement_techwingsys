import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { loginUser } from '../API/ApiCalling';
import { useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading spinner
  const dispatch = useDispatch();

  async function APIcallLogin() {
    setLoading(true); // Start loading
    try {
      await loginUser({ email, password }, dispatch);
    } catch (error) {
      console.error("Login failed:", error);
    }
    setLoading(false); // Stop loading
  }

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">Executive Login Page</div>

          <input
            className="login-input"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" onClick={APIcallLogin} disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : 'Log In'}
          </button>
        </div>
        <div className="divider">
          <div className="line"></div>
          <div className="or">OR</div>
          <div className="line"></div>
        </div>
        <Link to={"/Admin"} className="forgot-password" >
        Admin Login
        </Link>
      </div>
    </div>
  );
}

export default Login;
