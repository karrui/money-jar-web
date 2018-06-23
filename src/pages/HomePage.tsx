import * as React from 'react';

import withAuthorization from '../components/Authentication/withAuthorization';
import { db } from '../components/firebase';

const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>
);
interface State {
  users: firebase.database.DataSnapshot | null;
}
class HomePage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.userMethods.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        {!!users && <UserList users={users} />}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);