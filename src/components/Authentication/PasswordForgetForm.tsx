import * as React from 'react';

import { authMethods } from "../../firebase";

interface State {
  email: string;
  message: string | null;
}

const INITIAL_STATE = {
  email: '',
  message: null,
};

class PasswordForgetForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    authMethods.doPasswordReset(email)
    .then(() => {
      this.setState(() => ({
        ...INITIAL_STATE,
        message: `Password reset email sent to ${this.state.email}.`
      }));
    })
    .catch((error) => {
      this.setState({ message: error.message });
    });

    event.preventDefault();
  }

  render() {
    const {
      email,
      message,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {message && <p>{message}</p>}
      </form>
    );
  }
}

export default PasswordForgetForm;
