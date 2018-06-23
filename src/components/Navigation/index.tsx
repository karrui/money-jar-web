import * as React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import AuthUserContext from '../Authentication/AuthUserContext';
import SignoutButton from './SignoutButton';

const NavigationAuth = () => (
  <div>
    <ul>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.HOME}>Home</Link></li>
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
      <li><SignoutButton /></li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <ul>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>
  </div>
);

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

export default Navigation;
