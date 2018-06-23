import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { auth } from '../firebase/firebase';

interface Props {
  onSetAuthUser: any;
}

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component<Props> {
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      auth.onAuthStateChanged((authUser) => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetAuthUser: authUser => dispatch({ authUser, type: 'AUTH_USER_SET' }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;