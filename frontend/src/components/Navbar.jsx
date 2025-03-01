import React from 'react'
import logo from '../assets/images/todo-logo.png';
import '../assets/styles/navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul>
        
        <Link to='/login'><li><span>Sign Out</span></li></Link>
      </ul>
    </div>
  )
}

export default Navbar