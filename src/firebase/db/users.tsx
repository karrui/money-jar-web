import { db } from '../firebase';

/* User model in Firebase:

id: {
  username: string,
  email: string,
  ownedJars: [ jarId ],
}

*/

// User API
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');