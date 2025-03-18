import React,{useState} from 'react'
import '../assets/styles/signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleFormSubmit = async  (e) =>{
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password,
        }); 
        setSuccess("Account created successfully. Please login.");
        setUsername('');
        setEmail('');
        setPassword('');
    }catch(error){
        setError("An error occurred during registration. Please try again.");
        console.error("Error adding user:", error);
    }
}
  return (
    <div className='signup-form-container'>
      <div className="signup-form">
        <div className="signup-header-container">
          <h2>Signup</h2>
        </div>
        <div className="signup-input-container">
          <form onSubmit={handleFormSubmit}>
            <div className="inputs">
              <label htmlFor="">Prerfered UserName</label>
              <input type="text" name="username" id="username" value={username} onChange={(e)=> setUsername(e.target.value)} required/>
            </div>
            <div className="inputs">
              <label htmlFor="">Email</label>
              <input type="email" name="email" id="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="inputs">
              <label htmlFor="">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            </div>
            {error && alert({error})}
            {success && alert({success})}
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