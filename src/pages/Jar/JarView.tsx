import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../../components/Authentication/withAuthorization';
import { Redirect } from 'react-router';
import { HOME } from '../../constants/routes';
import { db } from '../../firebase';
import { Dispatch } from 'redux';

interface State {
  redirect: boolean;
}

interface Props {
  currentUser: firebase.User;
  onSetJarView: Function;
}

class JarView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    const path = window.location.toString().split('/');
    const pathUsername = path[3];
    const jarId = path[5];
    const { currentUser, onSetJarView } = this.props;

    // first check
    if (currentUser.displayName !== pathUsername) {
      this.setState({
        redirect: true,
      });
    } else {
      db.jarMethods.getJarByJarId(jarId)
      .then((snapshot) => {
        const jar = snapshot.val();
        // second check
        if (jar.owner !== currentUser.uid) {
          this.setState({
            redirect: true,
          });
        } else {
          onSetJarView(jar);
        }
      });
    }
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={HOME} />;
    }

    return (
      <div>
        Hello World
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetJarView: jar => dispatch({ type: 'JAR_VIEW_SET', payload: jar }),
});

const authCondition = currentUser => !!currentUser;

const enhance = compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(JarView);
