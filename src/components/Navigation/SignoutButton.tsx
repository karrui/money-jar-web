import * as React from 'react';
import { auth } from '../Authentication';

const SignOutButton = () => (
  <button
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>
);

export default SignOutButton;
