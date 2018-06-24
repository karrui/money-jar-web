import * as React from 'react';

import { History } from "history";

import { authMethods, db } from '../../firebase';
import { HOME } from '../../constants/routes';

interface State {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  message: string | null;
}

interface Props {
  history: History;
}

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  message: null,
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

    authMethods.doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Create a user in your own accessible Firebase Database too
        db.userMethods.doCreateUser(authUser.user!.uid, username, email)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(HOME);
        })
        .catch((error) => {
          this.setState({ message: error.message });
        });
      })
      .catch((error) => {
        this.setState({ message: error.message });
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      message,
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
          placeholder="Username"
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

        {message && <p>{message}</p>}
      </form>
    );
  }
}

export default SignUpForm;
