import * as React from "react";
import {
  Link,
  withRouter,
} from 'react-router-dom';

import * as routes from '../constants/routes';
import * as auth from '../components/firebase/authMethods';
import { db } from '../components/firebase';
import { History } from "history";

interface State {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: { message: string } | null;
}

interface Props {
  history: History;
}

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
};

class SignUpForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Create a user in your own accessible Firebase Database too
        db.userMethods.doCreateUser(authUser.user!.uid, username, email)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch((error) => {
          this.setState({ error });
        });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      error,
    } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === '' ||
      email === '' ||
      username === '';
    
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState({ username: event.target.value })}
          type="text"
          placeholder="Full Name"
        />
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
        <input
          value={confirmPassword}
          onChange={event => this.setState({ confirmPassword: event.target.value })}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpPage = ({ history }) => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>
);

export default withRouter(SignUpPage);

export const SignUpLink = () => (
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);