import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../components/Authentication/withAuthorization';
import { db } from '../components/firebase';
import { Dispatch } from 'redux';

const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>
);

interface Props {
  onSetUsers: any;
  users: any;
}

class HomePage extends React.Component<Props> {

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.userMethods.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        {!!users && <UserList users={users} />}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetUsers: users => dispatch({ users, type: 'USERS_SET' }),
});

const authCondition = authUser => !!authUser;

const enhance = compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(HomePage);
