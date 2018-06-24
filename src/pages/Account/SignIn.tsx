import * as React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "recompose";

import SignInForm from '../../components/Authentication/SignInForm';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from "./PasswordForget";
import Error404 from '../Error404';

const SignInPage: any = ({ history, currentUser }) => {
  return currentUser
    ? <Error404 />
    : (
    <div>
      <h1>Sign In</h1>
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
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

export default enhance(SignInPage);