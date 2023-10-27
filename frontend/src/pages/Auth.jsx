import { Box, Button, Card, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  });

  async function loginUser() {
    // setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/user/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        // Handle a successful login here
        console.log('Login successful');
        const userData = await response.json();
        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(userData));
        navigate.push('/');
        window.location.reload();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }

    setLoading(false);
  }

  async function signUpUser() {
    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:5000/user/api/createAccount',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpData),
        }
      );

      if (response.status === 201) {
        const userData = await response.json(); // Parse the response body as JSON

        localStorage.setItem('user', JSON.stringify(userData));
        navigate.push('/');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }

    setLoading(false);
  }

  const handleSubmit = () => {
    setError('');
    isLogin ? loginUser() : signUpUser();
  };

  const handleChange = (data, value, setData) => {
    setData((prev) => ({
      ...prev,
      [data]: value,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '50%',
          bgcolor: '#fefefe',
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h3">Login</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Email"
              type="email"
              value={loginData.email}
              onChange={(e) =>
                handleChange('email', e.target.value, setLoginData)
              }
              sx={{ border: '2px solid gray', mt: 5, borderRadius: 2 }}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                handleChange('password', e.target.value, setLoginData)
              }
              sx={{ border: '2px solid gray', mt: 2, borderRadius: 2 }}
            />
            {error && (
              <Typography color="brown" mt={1} textTransform={'capitalize'}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{
                background: '#a52a2a',
                mt: 2,
                color: 'white',
                borderRadius: 2,
              }}
              onClick={handleSubmit}
              fullWidth
            >
              {loading ? 'loading...' : 'Login'}
            </Button>

            <Button sx={{ color: 'black' }} onClick={() => setIsLogin(false)}>
              Don't have an account? Create Account
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h3">Create Account</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Full Name"
              value={signUpData.name}
              onChange={(e) =>
                handleChange('name', e.target.value, setSignUpData)
              }
              sx={{ border: '2px solid gray', mt: 5, borderRadius: 2 }}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Email"
              type="email"
              value={signUpData.email}
              onChange={(e) =>
                handleChange('email', e.target.value, setSignUpData)
              }
              sx={{ border: '2px solid gray', mt: 5, borderRadius: 2 }}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Password"
              type="password"
              value={signUpData.password}
              onChange={(e) =>
                handleChange('password', e.target.value, setSignUpData)
              }
              sx={{ border: '2px solid gray', mt: 5, borderRadius: 2 }}
            />
            {error && (
              <Typography color="brown" mt={1} textTransform={'capitalize'}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{
                background: '#a52a2a',
                mt: 2,
                color: 'white',
                borderRadius: 2,
              }}
              onClick={handleSubmit}
              fullWidth
            >
              {loading ? 'loading...' : 'Create Account'}
            </Button>
            <Button sx={{ color: 'black' }} onClick={() => setIsLogin(true)}>
              Already have an account? Login
            </Button>
          </>
        )}
      </Card>
    </Box>
  );
}

export default Auth;
