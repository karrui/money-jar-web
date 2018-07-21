import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import SignoutButton from './SignoutButton';

const NavigationAuth = () => (
  <ul>
    {/* <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li> */}
    <li><SignoutButton /></li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>
);

const Navigation = ({ currentUser, type }) => (
  <div className={`nav-links ${type}`}>
    { currentUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(Navigation);
