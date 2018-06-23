import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { auth } from '../firebase/firebase';
import AuthUserContext from './AuthUserContext';
import * as routes from '../../constants/routes';

const withAuthorization = authCondition => (Component) => {
  class WithAuthorization extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component /> : null}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;