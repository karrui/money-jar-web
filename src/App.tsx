import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import PasswordForgetPage from './pages/PasswordForgetPage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';

import * as routes from './constants/routes';
import withAuthentication from './components/Authentication/withAuthentication';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact={true} path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact={true} path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact={true} path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact={true} path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact={true} path={routes.HOME} component={() => <HomePage />} />
      <Route exact={true} path={routes.ACCOUNT} component={() => <AccountPage />} />
    </div>
  </Router>
);

export default withAuthentication(App);
