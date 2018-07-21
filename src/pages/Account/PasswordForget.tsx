import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import PasswordForgetForm from '../../components/Authentication/PasswordForgetForm';
import { PASSWORD_FORGET } from '../../constants/routes';
import { connect } from 'react-redux';
import Error404 from '../Error404';
import { ReturnToSignInLink } from './SignUp';

export const PasswordForgetLink = () => (
  <p>
    <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetPage = ({ currentUser }) => {
  return currentUser
  ? <Error404 />
  : (
    <div className="login card">
      <div className="login-inner card-inner">
        <h1 className="words">Reset Password</h1>
        <PasswordForgetForm />
        <ReturnToSignInLink />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const enhance: any = compose(
  connect(mapStateToProps)
);

export default enhance(PasswordForgetPage);
