import * as React from 'react';
import { Auth } from 'aws-amplify';
import { css } from 'glamor';

import styles from './signUp.styles';

interface State {
  username: string;
  password: string;
  email: string;
  error: string;
}

export default class SignUp extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      error: '',
    };
  }

  public onChange = (key: string, value: string) => {
    this.setState({ [key]: value } as Pick<State, keyof State>);
  }

  public signUp = () => {
    const { username, password, email } = this.state;
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
      }
    })
    .catch(error =>  this.setState({error: error.message || error }));
  }

  public render() {
    const { error } = this.state;

    return (
      <div {...css(styles.container)}>
        <h2>SignUp</h2>
        <input
          {...css(styles.input)}
          placeholder="Username"
          onChange={event => this.onChange('username', event.target.value)}
        />
        <input
          {...css(styles.input)}
          placeholder="Password"
          type="password"
          onChange={event => this.onChange('password', event.target.value)}
        />
        <input
          {...css(styles.input)}
          placeholder="Email"
          onChange={event => this.onChange('email', event.target.value)}
        />
        <div {...css(styles.button)} onClick={this.signUp}>
          <span>Sign Up</span>
        </div>
        {
          error &&
          <span>{error}</span>
        }
      </div>
    );
  }
}
