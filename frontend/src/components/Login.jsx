import React from 'react'
import '../assets/styles/login.css'
import googleLogo from '../assets/images/google-logo.png'
import { Link } from 'react-router-dom';
const Login = () => {

  return (
    <div className='login-form-container'>
      <div className="login-form">
        <div className="login-header-container">
          <h2>Login</h2>
        </div>
        <form action="">
          <div className="login-inputs">
            <label htmlFor="">Email Address</label>
            <input type="email" name="email" id="email"  required/>
          </div>
          <div className="login-inputs">
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="password" required/>
          </div>
          <div className="login-submit">
            <button type="submit" >Login</button>
          </div>
          <div className="login-google">
            <p>Don't Have an account? &nbsp;
              <span>
                <Link to='/signup' className='custom-link'>signup</Link>
              </span>
            </p>
            <button><img src={googleLogo} alt="" /></button>
            <p>Login With Google</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;