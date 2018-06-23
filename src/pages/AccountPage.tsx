import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import ChangePasswordForm from './ChangePasswordForm';
import withAuthorization from '../components/Authentication/withAuthorization';

const AccountPage = ({ authUser }) => (
  <div>
    <h1>Account: {authUser.email}</h1>
    <ChangePasswordForm />
  </div>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const authCondition = authUser => !!authUser;

const enhance = compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
);

export default enhance(AccountPage);
