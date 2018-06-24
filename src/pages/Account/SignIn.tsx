import * as React from "react";
import {
  withRouter,
} from 'react-router-dom';

import SignInForm from '../../components/Authentication/SignInForm';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from "./PasswordForget";

const SignInPage = ({ history }) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default withRouter(SignInPage);