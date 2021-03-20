import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from 'app/pages/Home';
import SignIn from 'app/pages/Onboarding/SignIn';
import SignUp from 'app/pages/Onboarding/SignUp';
import Customers from 'app/pages/Customers';
import CustomersDetail from 'app/pages/Customers/CustomersDetail';
import Products from 'app/pages/Products';
import Providers from 'app/pages/Providers';

export default function Routes() {
  const routes = [
    {
      path: '/',
      component: Home,
      isExact: true,
      isPrivate: true,
    },
    {
      path: '/cadastro',
      component: SignUp,
    },
    {
      path: '/login',
      component: SignIn,
    },
    {
      path: '/clientes',
      component: Customers,
      isExact: true,
      isPrivate: true,
    },
    {
      path: '/clientes/:id',
      component: CustomersDetail,
      isPrivate: true,
    },
    {
      path: '/produtos',
      component: Products,
      isExact: true,
      isPrivate: true,
    },
    {
      path: '/fornecedores',
      component: Providers,
      isExact: true,
      isPrivate: true,
    },
  ];

  return (
    <BrowserRouter>
      <Switch>
        {routes.map(route => {
          return route.isPrivate ? (
            <PrivateRoute
              exact={route.isExact}
              path={route.path}
              component={route.component}
            />
          ) : (
            <Route
              exact={route.isExact}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}
