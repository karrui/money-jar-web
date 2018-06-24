import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { auth } from '../../firebase/firebase';
import * as routes from '../../constants/routes';

const withAuthorization = authCondition => (Component: React.ComponentClass) => {
  class WithAuthorization extends React.Component<any, {}> {
    componentDidMount() {
      auth.onAuthStateChanged((currentUser) => {
        if (!authCondition(currentUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.props.currentUser ? <Component /> : null;
    }
  }

  const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
  });

  const enhance = compose(
    withRouter,
    connect(mapStateToProps),
  );

  return enhance(WithAuthorization);
};

export default withAuthorization;