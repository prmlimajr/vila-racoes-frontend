import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import Navbar from '../components/Navbar';
import { isAuthenticated } from '../services/auth';

export default function PrivateRoute({ component: Component, ...rest }) {
  const currentLocation = window.location.pathname;
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <>
            {currentLocation !== '/' && <Navbar />}
            <div className='row'>
              <Component {...props} />
            </div>
          </>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}
