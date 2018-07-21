import * as React from 'react';
import * as auth from '../../firebase/authMethods';

const SignOutButton = () => (
  <a
    className="signout-link clickable"
    onClick={auth.doSignOut}
  >
    Sign Out
  </a>
);

export default SignOutButton;
