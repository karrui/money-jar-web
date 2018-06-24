import * as React from "react";
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { compose } from "recompose";
import { connect } from "react-redux";

import { SIGN_UP } from '../../constants/routes';
import SignUpForm from '../../components/Authentication/SignUpForm';
import Error404 from '../Error404';

const SignUpPage: any = ({ history, currentUser }) => {
  return currentUser
  ? <Error404 />
  : (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm history={history} />
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
);

export default enhance(SignUpPage);

export const SignUpLink = () => (
  <p>
    Don't have an account? &nbsp;
    <Link to={SIGN_UP}>Sign Up</Link>
  </p>
);