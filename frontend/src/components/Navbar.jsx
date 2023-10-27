import * as React from 'react';
import logo from './aukLogo.jfif';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <AppBar position="relative" color="white" style={{ marginBottom: '150px' }}>
      <Toolbar style={{ paddingLeft: '80px', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="auk" style={{ width: '100px' }} />

          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <Typography
              variant="h3"
              style={{ fontFamily: 'Roboto', color: '#a52a2a' }}
            >
              ePoll
            </Typography>
          </Link>
        </Box>
        <Button variant="outlined" onClick={handleClick}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
