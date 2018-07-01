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
}

const connectToRedux = connect(
  (state: any) => ({
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

    this.state = {
      ...INITIAL_STATE,
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
      <div className="form-area">
        <div className="action-form-wrapper">
          <form onSubmit={this.onSubmit}>
            <span className="symbol">$</span>
            <input
              className="amt-input"
              value={amountToWithdraw}
              onChange={event => this.setState({ amountToWithdraw: event.target.value })}
              type="number"
              placeholder="0"
            />
            <input
              className="notes-input"
              value={notes}
              onChange={event => this.setState({ notes: event.target.value })}
              type="text"
              placeholder="Notes (optional)"
            />
            <button className="withdraw-btn" type="submit" disabled={isInvalid}>
              😥
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connectToRedux(WithdrawJarTransactionForm);