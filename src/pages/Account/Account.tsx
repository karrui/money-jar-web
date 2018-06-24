import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import ChangePasswordForm from '../../components/Authentication/ChangePasswordForm';
import withAuthorization from '../../components/Authentication/withAuthorization';

interface AccountProps {
  children?: React.ReactNode;
  currentUser: firebase.User;
}

const AccountPage: React.SFC = ({ currentUser }: AccountProps) => (
  <div>
    <h1>Account: {currentUser.email}</h1>
    <ChangePasswordForm />
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const authCondition = currentUser => !!currentUser;

const enhance = compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
);

export default enhance(AccountPage);
