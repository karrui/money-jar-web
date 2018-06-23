import * as React from 'react';

import * as auth from '../components/firebase/authMethods';

interface State {
  password: string;
  confirmPassword: string;
  error: { message: string } | null;
}

const INITIAL_STATE = {
  password: '',
  confirmPassword: '',
  error: null,
};

class PasswordChangeForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { password } = this.state;

    auth.doPasswordUpdate(password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE, error: { message: "Password successfully changed." } }));
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const {
      password,
      confirmPassword,
      error,
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

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;