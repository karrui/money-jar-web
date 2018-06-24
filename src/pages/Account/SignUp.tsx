import * as React from "react";
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { SIGN_UP } from '../../constants/routes';
import SignUpForm from '../../components/Authentication/SignUpForm';

const SignUpPage = ({ history }) => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>
);

export default withRouter(SignUpPage);

export const SignUpLink = () => (
  <p>
    Don't have an account? &nbsp;
    <Link to={SIGN_UP}>Sign Up</Link>
  </p>
);