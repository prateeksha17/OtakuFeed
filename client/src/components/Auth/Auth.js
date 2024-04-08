import React, { useState } from 'react';
import styles from './Auth.module.css';
import LockOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { useDispatch } from 'react-redux';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    if (isSignup) {
      console.log('Navigating to / after signup');
      dispatch(signup(formData, navigate));
    } else {
      console.log('Navigating to / after signin');
      dispatch(signin(formData, navigate));
    }
    console.log('Login or signup done');
    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container className={styles.container} component="main" maxWidth="xs">
      <Paper className={styles.paper}>
        {/* <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}  type="submit" fullWidth variant="contained" color="primary" className={styles.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button className={styles.switch} onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
