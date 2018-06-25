import * as React from 'react';
import { connect } from 'react-redux';

import { addTransactionToJar } from '../../firebase/db/jars';
import Jar from '.';

interface Props {
  currentJar: Jar;
  currentUser: firebase.User;
}

interface State {
  amountToAdd: string;
  notes: string;
  currentJar: Jar;
  currentUser: firebase.User;
}

const connectToRedux = connect(
  (state: any) => ({
    currentJar: state.jars.currentJar,
    currentUser: state.session.currentUser,
  }),
);

const INITIAL_STATE = {
  amountToAdd: '',
  notes: '',
};

class AddJarTransactionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { currentUser, currentJar } = this.props;

    this.state = {
      ...INITIAL_STATE,
      currentJar,
      currentUser,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      amountToAdd,
      notes,
    } = this.state;

    const { currentJar, currentUser } = this.props;

    addTransactionToJar(currentJar, currentUser, amountToAdd, notes);
    this.setState(INITIAL_STATE);
  }

  render() {
    const {
      amountToAdd,
      notes,
    } = this.state;

    const isInvalid =
      Number(amountToAdd) === 0;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={amountToAdd}
          onChange={event => this.setState({ amountToAdd: event.target.value })}
          type="number"
          placeholder="0"
        />
        <input
          value={notes}
          onChange={event => this.setState({ notes: event.target.value })}
          type="text"
          placeholder="Notes (optional)"
        />
        <button type="submit" disabled={isInvalid}>
          Add a transaction
        </button>
      </form>
    );
  }
}

export default connectToRedux(AddJarTransactionForm);