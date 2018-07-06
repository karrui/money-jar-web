import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../components/Authentication/withAuthorization';
import { db } from '../firebase/firebase';
import { Dispatch } from 'redux';
import CreateJarForm from '../components/Jar/CreateForm';
import JarList from '../components/Jar/JarList';
import { doCreateJar } from '../firebase/db/jars';

interface Props {
  onSetJars: Function;
  onResetJars: Function;
  userId: string;
  username: string;
}

interface State {
  isFormShown: boolean;
  isLoading: boolean;
  dbOwnedQuery: firebase.database.Query;
  dbSharedQuery: firebase.database.Query;
  jars: object;
}

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { userId } = this.props;
    const dbOwnedQuery = db.ref(`/jars`).orderByChild('owner').equalTo(userId);
    const dbSharedQuery = db.ref(`/jars`).orderByChild(`sharedTo/${userId}`).equalTo(true);

    this.state = {
      dbOwnedQuery,
      dbSharedQuery,
      isFormShown: false,
      isLoading: true,
      jars: {},
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { onSetJars } = this.props;
    this.state.dbOwnedQuery.on('value', (snapshot: firebase.database.DataSnapshot) => {
      const ownedJars = snapshot.val();
      this.setState({
        jars: { ...this.state.jars, ...ownedJars },
        isLoading: false,
      });
      onSetJars(ownedJars);
    });
    this.state.dbSharedQuery.on('value', (snapshot: firebase.database.DataSnapshot) => {
      const sharedJars = snapshot.val();
      this.setState({
        jars: { ...this.state.jars, ...sharedJars },
        isLoading: false,
      });
      onSetJars(sharedJars);
    });
  }

  componentWillUnmount() {
    this.state.dbOwnedQuery.off();
    this.state.dbSharedQuery.off();
  }

  handleClick = () => {
    this.setState(prevState => ({
      isFormShown: !prevState.isFormShown
    }));
  }

  handleCreateJar = (values) => {
    const { name, currentAmount = 0, goalAmount } = values;
    const { userId } = this.props;

    doCreateJar(userId, name, currentAmount, goalAmount);
    this.setState({
      isFormShown: false,
    });
  }

  render() {
    const { isLoading, jars } = this.state;
    return isLoading
    ? <div>Loading...</div>
    : (
      <div className="home-view">
        {
          this.state.isFormShown 
          ? <div className="home-create-form-wrapper">
            <CreateJarForm onSubmit={this.handleCreateJar}/>
            <span className="close-create-form clickable" onClick={this.handleClick}>
              <i className="fas fa-times" />
            </span>
            </div>
          : <button onClick={this.handleClick}>+</button>
        }
        {!!jars &&
          <JarList jars={jars} />}
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
