import React,{useState} from 'react'
import '../assets/styles/login.css'
import googleLogo from '../assets/images/google-logo.png'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../auth/authSlice';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:3000/api/auth/login",{
            email,
            password,
        });
        if(response.status === 200){
            dispatch(
                loginSuccess({
                    token: response.data.token 
                })
            );
            navigate('/todo');
        }else{
            setError("Username or password incorrect, please try again");
        }
    }catch(error){
        setError("An error occurred. Please try again later.");
        console.error(error);
    }
  }

  return (
    <div className='login-form-container'>
      <div className="login-form">
        <div className="login-header-container">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="login-inputs">
            <label htmlFor="">Email Address</label>
            <input type="email" name="email" id="email" placeholder="sample@mail.com" value={email} onChange={(e)=> setEmail(e.target.value)}  required/>
          </div>
          <div className="login-inputs">
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          </div>
          {error && alert({error})}
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