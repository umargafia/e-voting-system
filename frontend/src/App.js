import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import Layout from './pages/Layout';
import Results from './pages/Results';
import Poll from './pages/Poll';
import Footer from './components/Footer';
import Auth from './pages/Auth';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            exact
            path="/auth"
            render={(props) =>
              user ? <Redirect to="/" /> : <Auth {...props} />
            }
          />
          <Route
            exact
            path="/"
            render={(props) =>
              user ? <Layout {...props} /> : <Redirect to="/auth" />
            }
          />

          {user && (
            <>
              <Route exact path="/results" component={Results} />
              <Route exact path="/poll" component={Poll} />
            </>
          )}
        </Switch>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
