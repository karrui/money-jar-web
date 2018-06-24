import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { db } from '../../firebase';

const withRights = () => (Component: React.ComponentClass) => {
  class WithRights extends React.Component<any, {}> {
    componentDidMount() {
      const path = window.location.toString().split('/');
      const pathUsername = path[3];
      const jarId = path[5];
      const { currentUser, onSetJarView } = this.props;

      // first check
      if (currentUser.displayName !== pathUsername) {
        this.props.history.push(routes.HOME);
      } else {
        db.jarMethods.getJarByJarId(jarId)
        .then((snapshot) => {
          const jar = snapshot.val();
          // second check
          if (!jar || (jar.owner !== currentUser.uid)) {
            this.props.history.push(routes.HOME);
          } else {
            onSetJarView(jar);
          }
        });
      }
    }

    render() {
      return this.props.currentUser ? <Component /> : null;
    }
  }

  const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetJarView: jar => dispatch({ type: 'JAR_VIEW_SET', payload: jar }),
  });

  const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  );

  return enhance(WithRights);
};

export default withRights;