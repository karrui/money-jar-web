import * as React from 'react';
import { User } from 'firebase';

import { auth } from './firebase';
import AuthUserContext from './AuthUserContext';

interface State {
  authUser: User | null;
}

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component<{}, State> {
    constructor(props: {}) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthentication;