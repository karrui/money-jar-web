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
}

const connectToRedux = connect(
  (state: any) => ({
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

    this.state = {
      ...INITIAL_STATE,
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
      <div className="form-area">
        <div className="action-form-wrapper">
          <form onSubmit={this.onSubmit}>
            <span className="symbol">$</span>
            <input
              className="amt-input"
              value={amountToAdd}
              onChange={event => this.setState({ amountToAdd: event.target.value })}
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
            <button className="submit-btn" type="submit" disabled={isInvalid}>
              🤑
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connectToRedux(AddJarTransactionForm);