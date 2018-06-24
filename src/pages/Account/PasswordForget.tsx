import * as React from 'react';
import { Link } from 'react-router-dom';

import PasswordForgetForm from '../../components/Authentication/PasswordForgetForm';
import { PASSWORD_FORGET } from '../../constants/routes';

export const PasswordForgetLink = () => (
  <p>
    <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetPage = () => (
  <div>
    <h1>Reset Password</h1>
    <PasswordForgetForm />
  </div>
);

export default PasswordForgetPage;
