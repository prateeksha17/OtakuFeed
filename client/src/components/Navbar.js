import React, {useState, useEffect} from 'react';
import { Avatar, Toolbar, Typography, Button } from '@mui/material';
import {Link, useNavigate,useLocation} from 'react-router-dom';
import font from '../images/fontbolt.png'
import styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    navigate('/auth'); // Use navigate function directly
  };

  useEffect(() => {
    const token = user?.token;
  
    if (token) {
      const decodedToken = jwtDecode(token);
  
      // Check if the token is still valid (not expired)
      if (decodedToken.exp * 1000 > new Date().getTime()) {
        setUser(JSON.parse(localStorage.getItem('profile')));
      } else {
        // Token is expired, perform logout
        logout();
      }
    } else {
      setUser(null); // No token, so set user to null
    }
    if (location.pathname === '/') {
      setUser(JSON.parse(localStorage.getItem('profile')));
    } else {
      setUser(null);
    }
  }, [location]);

  

    return (
      <div className={styles.container}>
        <div position='static' color='inherit' className={styles.appBar}>
          <div  className={styles.text_logo} component={Link} to='/'  align='center'>
            <div> <img src={font} alt='logo'/></div>
          </div>
          
          
        <Toolbar className={styles.toolbar}>
          {user ? (
            <div className={styles.profile}>
              <Avatar className={styles.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              &nbsp;
              &nbsp;
              
              <Typography style={{ color: 'rgba(256,256,256)' }}  className={styles.userName}
             
              variant='h6'>{user.result.name}</Typography> &nbsp;
              &nbsp;
              &nbsp;
              <Button  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} variant='contained' className={styles.logout} color='secondary' onClick={logout}>Logout</Button>
            </div>
          ): location.pathname === '/' &&(
<Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className={styles.logout} component={Link} to='/auth' variant='contained' color='primary'> SignUp</Button>
          )
          }
        </Toolbar>

        </div>
      </div>
    );
  };
export default Navbar; // Ensure that Navbar is the default export
