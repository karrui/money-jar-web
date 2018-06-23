import * as React from 'react';
import { Link } from 'react-router-dom';

import * as auth from '../components/firebase/authMethods';
import { PASSWORD_FORGET } from '../constants/routes';

interface State {
  email: string;
  error: { message: string } | null;
}

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE,
          error: { 
            message: `Password reset email sent to ${this.state.email}.`
          }
        }));
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
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

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export const PasswordForgetLink = () => (
  <p>
    <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetPage = () => (
  <div>
    <h1>Reset Password</h1>
    <PasswordForgetForm />
  </div>
);

export default PasswordForgetPage;
