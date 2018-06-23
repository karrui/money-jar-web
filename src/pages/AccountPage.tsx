import * as React from 'react';

import AuthUserContext from '../components/Authentication/AuthUserContext';
import ChangePasswordForm from './ChangePasswordForm';
import withAuthorization from '../components/Authentication/withAuthorization';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser!.email}</h1>
        <ChangePasswordForm />
      </div>
    }
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
