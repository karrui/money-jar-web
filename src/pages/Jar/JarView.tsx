import * as React from 'react';
import { compose } from 'recompose';

import withAuthorization from '../../components/Authentication/withAuthorization';
import withRights from '../../components/Jar/withRights';
import { connect, Dispatch } from 'react-redux';
import { db } from '../../firebase';

class JarView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
      isFormShown: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const jarId = window.location.toString().split('/')[5];
    db.jarMethods.getJarByJarId(jarId)
    .then((snapshot) => {
      const jar = snapshot.val();
      this.props.onSetJarView(jar);
      this.setState({
        isLoading: false,
      });
    });
  }

  handleClick() {
    this.setState(prevState => ({
      isFormShown: !prevState.isFormShown
    }));
  }

  render() {
    const { currentJar } = this.props;

    return this.state.isLoading
    ? <div>Please wait...</div>
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
          ? <div>Add form here</div>
          : <button onClick={this.handleClick}>Add money</button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentJar: state.jars.currentJar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetJarView: jar => dispatch({ type: 'JAR_VIEW_SET', payload: jar }),
});

const authCondition = currentUser => !!currentUser;

const enhance = compose(
  withAuthorization(authCondition),
  withRights(),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(JarView);
