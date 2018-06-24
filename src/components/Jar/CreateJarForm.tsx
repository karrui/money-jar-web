import * as React from 'react';
import { connect } from 'react-redux';

import { doCreateJar } from '../../firebase/db/jars';

const connectToRedux = connect(
  (state: any) => ({
    userId: state.session.currentUser.uid,
  })
);

interface State {
  name: string;
  currentAmount: string;
  goalAmount: string;
}

const INITIAL_STATE = {
  name: '',
  currentAmount: "0",
  goalAmount: "0",
};

class CreateJarForm extends React.Component<any, State> {
  constructor(props: {}) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      name,
      currentAmount,
      goalAmount,
    } = this.state;

    const { userId } = this.props;

    doCreateJar(userId, name, currentAmount, goalAmount);
  }

  render() {
    const {
      name,
      currentAmount,
      goalAmount,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={name}
          onChange={event => this.setState({ name: event.target.value })}
          type="text"
          placeholder="Money jar name"
        />
        <input
          value={currentAmount}
          onChange={event => this.setState({ currentAmount: event.target.value })}
          type="number"
          placeholder={this.state.currentAmount}
        />
        <input
          value={goalAmount}
          onChange={event => this.setState({ goalAmount: event.target.value })}
          type="number"
          placeholder={this.state.goalAmount}
        />
        <button type="submit">
          Create a money jar!
        </button>
      </form>
    );
  }
}

export default connectToRedux(CreateJarForm);