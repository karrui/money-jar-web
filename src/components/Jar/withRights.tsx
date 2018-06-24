import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

const withRights = () => (Component: React.ComponentClass) => {
  class WithRights extends React.Component<any, {}> {
    componentDidMount() {
      const path = window.location.toString().split('/');
      const pathUsername = path[3];
      const { currentUser } = this.props;

      if (currentUser.displayName !== pathUsername) {
        this.props.history.push(routes.HOME);
      }
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

  return enhance(WithRights);
};

export default withRights;