import * as React from "react";
import { withRouter, Link } from 'react-router-dom';
import { compose } from "recompose";
import { connect } from "react-redux";

import SignUpForm from '../../components/Authentication/SignUpForm';
import Error404 from '../Error404';
import { SIGN_IN } from "../../constants/routes";

const SignInLink = () => (
  <p>
    Already have an account? &nbsp;
    <Link to={SIGN_IN}>Sign In</Link>
  </p>
);

const SignUpPage: any = ({ history, currentUser }) => {
  return currentUser
  ? <Error404 />
  : (
    <div className="login card">
      <div className="login-inner card-inner">
        <h1 className="words">Sign Up</h1>
        <SignUpForm history={history} />
        <SignInLink />
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

export default enhance(SignUpPage);
