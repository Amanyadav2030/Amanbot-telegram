import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';
const Navbar = () => {
  const { isAuth, logOutUser } = useContext(AuthContext);
  const redirect = useNavigate();
  return (
    <div className={styles.myNavbar}>
      <div className={styles.logo}>
        <h2>FlameCloud</h2>
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <Link to={'/'}>
              Home
            </Link>
          </li>
          <li>
            {
              isAuth ? <span onClick={logOutUser}>Logout</span> : <span onClick={() => redirect('/login')}>Login</span>
            }
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar