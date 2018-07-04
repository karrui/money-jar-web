import { db } from '../firebase';

/* User model in Firebase:
id: {
  username: string,
  email: string,
  jars: { key: type },  //type can be "owner" or "shared"
  id: string,
}
*/

// User API
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    id,
  });

export const checkUsernameExist = username =>
  db.ref('users/').orderByChild('username').equalTo(username).once('value');

export const onceGetUsers = () =>
  db.ref('users').once('value');