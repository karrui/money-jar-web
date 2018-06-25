import * as React from 'react';
import { compose } from 'recompose';

import withAuthorization from '../../components/Authentication/withAuthorization';
import withRights from '../../components/Jar/withRights';
import { connect, Dispatch } from 'react-redux';
import { db } from '../../firebase/firebase';
import AddJarTransactionForm from '../../components/Jar/AddJarTransactionForm';
import Error404 from '../Error404';

class JarView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const jarId = window.location.toString().split('/')[5];
    const dbReference = db.ref(`/jars/${jarId}`);

    this.state = {
      dbReference,
      isLoading: true,
      isFormShown: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

    this.state.dbReference.on('value', (snapshot: any) => {
      const jar = snapshot.val();
      this.props.onSetJarView(jar);
      this.setState({
        currentJar: jar,
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.state.dbReference.off();
  }

  handleClick() {
    this.setState(prevState => ({
      isFormShown: !prevState.isFormShown
    }));
  }

  render() {
    const { currentJar } = this.state;

    return (this.state.isLoading && !currentJar)
    ? <div>Please wait...</div>
    : currentJar === null
      ? <Error404 />
      : (
        <div>
          <div>
            {currentJar.name}
            {currentJar.currentAmount} / {currentJar.goalAmount}
            Last updated: {currentJar.lastUpdated}
            Hello
          </div>
          {
            this.state.isFormShown 
            ? <AddJarTransactionForm />
            : <button type="button" onClick={this.handleClick}>Add money</button>
          }
        </div>
      );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetJarView: jar => dispatch({ type: 'JAR_VIEW_SET', payload: jar }),
});

const authCondition = currentUser => !!currentUser;

const enhance = compose(
  withAuthorization(authCondition),
  withRights(),
  connect(null, mapDispatchToProps),
);

export default enhance(JarView);
