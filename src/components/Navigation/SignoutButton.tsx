import * as React from 'react';
import * as auth from '../firebase/authMethods';

const SignOutButton = () => (
  <button
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>
);

export default SignOutButton;
