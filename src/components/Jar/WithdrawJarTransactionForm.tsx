import * as React from 'react';
import { connect } from 'react-redux';

import { withdrawTransactionFromJar } from '../../firebase/db/jars';
import Jar from '.';

interface Props {
  currentJar: Jar;
  currentUser: firebase.User;
}

interface State {
  amountToWithdraw: string;
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
  amountToWithdraw: '',
  notes: '',
};

class WithdrawJarTransactionForm extends React.Component<Props, State> {
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
      amountToWithdraw,
      notes,
    } = this.state;

    const { currentJar, currentUser } = this.props;

    withdrawTransactionFromJar(currentJar, currentUser, amountToWithdraw, notes);
    this.setState(INITIAL_STATE);
  }

  render() {
    const {
      amountToWithdraw,
      notes,
    } = this.state;

    const isInvalid =
      Number(amountToWithdraw) === 0;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={amountToWithdraw}
          onChange={event => this.setState({ amountToWithdraw: event.target.value })}
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
          Withdraw
        </button>
      </form>
    );
  }
}

export default connectToRedux(WithdrawJarTransactionForm);