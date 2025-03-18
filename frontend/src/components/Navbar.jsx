import React from 'react'
import logo from '../assets/images/todo-logo.png';
import '../assets/styles/navbar.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.token);
  const handleLogout = async () => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(
            'http://localhost:3000/api/auth/logout',
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        localStorage.removeItem('token');
        
        dispatch(logout());
        navigate('/');
    } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed');
    }
};
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul>
      {isAuthenticated && (
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <span>Sign Out</span>
          </li>
      )}
      </ul>
    </div>
  )
}

export default Navbar