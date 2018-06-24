import * as React from 'react';

import { History } from 'history';

import { authMethods } from '../../firebase';
import { HOME } from '../../constants/routes';

interface State {
  email: string;
  password: string;
  message: string | null;
}

interface Props {
  history: History;
}

const INITIAL_STATE = {
  email: '',
  password: '',
  message: null,
};

class SignInForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    authMethods.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(HOME);
      })
      .catch((error) => {
        this.setState({ message: error.message });
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      message,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState({ password: event.target.value })}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {message && <p>{message}</p>}
      </form>
    );
  }
}

export default SignInForm;
