import * as React from 'react';
import { authMethods } from '../firebase';

interface State {
  password: string;
  confirmPassword: string;
  message: string | null;
}

const INITIAL_STATE = {
  password: '',
  confirmPassword: '',
  message: null,
};

class PasswordChangeForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { password } = this.state;

    authMethods.doPasswordUpdate(password)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE,
          message: "Password successfully changed."
        }));
      })
      .catch((error) => {
        this.setState({ message: error.message });
      });

    event.preventDefault();
  }

  render() {
    const {
      password,
      confirmPassword,
      message,
    } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={password}
          onChange={event => this.setState({ password: event.target.value })}
          type="password"
          placeholder="New Password"
        />
        <input
          value={confirmPassword}
          onChange={event => this.setState({ confirmPassword: event.target.value })}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {message && <p>{message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;