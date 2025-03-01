import React from 'react'
import '../assets/styles/signup.css';
import { Link } from 'react-router-dom';
const Signup = () => {
  return (
    <div className='signup-form-container'>
      <div className="signup-form">
        <div className="signup-header-container">
          <h2>Signup</h2>
        </div>
        <div className="signup-input-container">
          <form >
            <div className="inputs">
              <label htmlFor="">First Name</label>
              <input type="text" name="fname" id="fname"  required/>
            </div>
            <div className="inputs">
              <label htmlFor="">Last Name</label>
              <input type="text" name="lname" id="lname" required/>
            </div>
            <div className="inputs">
              <label htmlFor="">Email</label>
              <input type="email" name="email" id="email" required/>
            </div>
            <div className="inputs">
              <label htmlFor="">Password</label>
              <input type="password" name="password" id="password" required/>
            </div>
            <div className="input-submit">
              <button type="submit">Sign in</button>
            </div>
            <p>Already Have an Account? &nbsp;
              <span>
                <Link  to='/' className='custom-link'>Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup