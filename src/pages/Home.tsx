import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../components/Authentication/withAuthorization';
import { db } from '../firebase/firebase';
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
  userId: string;
  isFormShown: boolean;
  dbQuery: firebase.database.Query;
  jars?: any;
}

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { userId } = this.props;
    const dbQuery = db.ref(`/jars`).orderByChild('owner').equalTo(userId);

    this.state = {
      userId,
      dbQuery,
      isFormShown: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { onSetJars } = this.props;
    this.state.dbQuery.on('value', (snapshot: any) => {
      const jars = snapshot.val();
      this.setState({
        jars,
      });
      onSetJars(jars);
    });
  }

  componentWillUnmount() {
    this.state.dbQuery.off();
  }

  handleClick() {
    this.setState(prevState => ({
      isFormShown: !prevState.isFormShown
    }));
  }

  render() {
    const { username } = this.props;
    const { jars } = this.state;
    return (
      <div>
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetJars: jars => dispatch({ type: 'JARS_SET', payload: jars }),
});

const authCondition = currentUser => !!currentUser;

const enhance = compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(HomePage);
