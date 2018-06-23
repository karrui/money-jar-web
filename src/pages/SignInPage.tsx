import * as React from "react";
import {
  withRouter,
} from 'react-router-dom';

import * as routes from '../constants/routes';
import { auth } from '../components/Authentication';
import { History } from "history";
import { SignUpLink } from './SignUpPage';

interface State {
  email: string;
  password: string;
  error: { message: string } | null;
}

interface Props {
  history: History;
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
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

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
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

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInPage = ({ history }) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>
);

export default withRouter(SignInPage);