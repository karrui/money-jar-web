import * as React from "react";
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "recompose";

import SignInForm from '../../components/Authentication/SignInForm';
import { PasswordForgetLink } from "./PasswordForget";
import Error404 from '../Error404';
import { SIGN_UP } from "../../constants/routes";

const SignUpLink = () => (
  <p>
    Don't have an account? &nbsp;
    <Link to={SIGN_UP}>Sign Up</Link>
  </p>
);

const SignInPage: any = ({ history, currentUser }) => {
  return currentUser
    ? <Error404 />
    : (
    <div className="login card">
      <div className="login-inner card-inner">
        <h1 className="words">Sign In</h1>
        <SignInForm history={history} />
        <PasswordForgetLink />
        <SignUpLink />
      </div>
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