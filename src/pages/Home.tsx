import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../components/Authentication/withAuthorization';
import { db } from '../firebase';
import { Dispatch } from 'redux';
import CreateJarForm from '../components/Jar/CreateJarForm';
import JarList from '../components/Jar/JarList';

interface Props {
  onSetJars: Function;
  onResetJars: Function;
  jars: object;
  userId: string;
  username: string;
}

interface State {
  isFormShown: boolean;
}

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isFormShown: false };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { userId, onSetJars } = this.props;
    db.jarMethods.getJarsByUserId(userId)
    .then(jars => onSetJars(jars.val()));
  }

  // componentWillUnmount() {
  //   this.props.onResetJars();
  // }

  handleClick() {
    this.setState(prevState => ({
      isFormShown: !prevState.isFormShown
    }));
  }

  render() {
    const { jars, username } = this.props;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        {
          this.state.isFormShown 
          ? <CreateJarForm />
          : <button onClick={this.handleClick}>+</button>
        }
        {!!jars &&
          <JarList jars={jars} username={username} />}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userId: state.session.currentUser.uid,
  username: state.session.currentUser.displayName,
  jars: state.jars.jarList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetJars: jars => dispatch({ type: 'JARS_SET', payload: jars }),
  onResetJars: () => dispatch({ type: 'JARS_RESET' }),
});

const authCondition = currentUser => !!currentUser;

const enhance = compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(HomePage);
