import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import ChangePasswordForm from '../../components/Authentication/ChangePasswordForm';
import withAuthorization from '../../components/Authentication/withAuthorization';

interface AccountProps {
  children?: React.ReactNode;
  authUser: firebase.User;
}

const AccountPage: React.SFC = ({ authUser }: AccountProps) => (
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
