import { db, dbTimestamp } from "../firebase";
import Jar from "../../components/Jar";

/* Jar model in Firebase:

id: {
  currentAmount: number,
  goalAmount: number,
  createdAt: timestamp,
  lastUpdated: timestamp,
  name: string,
  owner: string, (id)
}
*/

// Jars API
export const doCreateJar = (userId, jarName, currentAmount, goalAmount) => {
  const key = db.ref('jars').push().key;
  const timestamp = dbTimestamp;
  return Promise.all([
    db.ref(`jars/${key}`).set({
      currentAmount: Number(currentAmount),
      goalAmount: Number(goalAmount),
      name: jarName,
      createdAt: timestamp,
      lastUpdated: timestamp,
      owner: userId,
      id: key,
    }),
    db.ref(`/users/${userId}/jars/${key}`).set('owner')
  ]);
};

// Withdraw amount from jar with Id
export const withdrawTransactionFromJar = (jar: Jar, user: firebase.User, transactionAmount: string, notes: string) => {
  const { id, currentAmount } = jar;
  const { displayName, uid } = user;
  const key = db.ref(`/jars/${id}/history`).push().key;
  const timestamp = dbTimestamp;

  const updatedJar = {
    currentAmount: currentAmount - Number(transactionAmount),
    lastUpdated: timestamp,
  };

  return Promise.all([
    db.ref(`/jars/${id}/history/${key}`).set({
      notes,
      userId: uid,
      username: displayName,
      amount: Number(transactionAmount),
      createdAt: timestamp,
      type: 'withdraw',
    }),
    db.ref(`/jars/${id}`).update(updatedJar),
  ]);
};

// Add amount into jar with Id
export const addTransactionToJar = (jar: Jar, user: firebase.User, transactionAmount: string, notes: string) => {
  const { id, currentAmount } = jar;
  const { displayName, uid } = user;
  const key = db.ref(`/jars/${id}/history`).push().key;
  const timestamp = dbTimestamp;

  const updatedJar = {
    currentAmount: currentAmount + Number(transactionAmount),
    lastUpdated: timestamp,
  };
  
  return Promise.all([
    db.ref(`/jars/${id}/history/${key}`).set({
      notes,
      userId: uid,
      username: displayName,
      amount: Number(transactionAmount),
      createdAt: timestamp,
      type: 'add',
    }),
    db.ref(`/jars/${id}`).update(updatedJar),
  ]);
};

// Remove transaction
export const removeTransactionFromJar = (transactionId, jarId, type) => {
  const timestamp = dbTimestamp;

  return Promise.all([
    db.ref(`jars/${jarId}/history/${transactionId}/amount`).once('value')
    .then((transactionAmount: any) =>
      db.ref(`jars/${jarId}`).once('value').then((jar) => {
        const currentAmount = type === 'add'
          ? jar.val().currentAmount - Number(transactionAmount.val())
          : jar.val().currentAmount + Number(transactionAmount.val());
        const updatedJar = {
          currentAmount,
          lastUpdated: timestamp,
        };
        db.ref(`/jars/${jarId}`).update(updatedJar);
      })
    ),
    db.ref(`jars/${jarId}/history/${transactionId}`).remove(),
  ]);
};

// Get all the jars by the user id
export const getJarsByUserId = (userId) => {
  return db.ref('/jars').orderByChild('owner').equalTo(userId).once('value');
};

// Get specific jar by user id and jar id
export const getJarByJarId = (jarId) => {
  return db.ref(`/jars/${jarId}`).once('value');
};

// share jar to user
export const shareJarToUserId = (jarId, userId) => {
  db.ref(`/jars/${jarId}/sharedTo/${userId}`).set(true);
  db.ref(`/users/${userId}/jars/${jarId}`).set('shared');
};