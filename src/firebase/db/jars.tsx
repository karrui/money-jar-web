import { db, dbTimestamp } from "../firebase";

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
    }),
    db.ref(`/users/${userId}/jars/${key}`).set(true)
  ]);
};

// Add amount into jar with Id
export const addTransactionToJar = (jarId, userId, transactionAmount) => {
  const key = db.ref(`/jars/${jarId}/history`).push().key;
  const timestamp = dbTimestamp;
  return Promise.all([
    db.ref(`/jars/${jarId}/history/${key}`).set({
      userId,
      amount: Number(transactionAmount),
      createdAt: timestamp,
    }),
    db.ref(`/jars/${jarId}`).once('value').then((jar: any) => {
      const updatedJar = {
        ...jar,
        amount: jar.amount + Number(transactionAmount),
      };
      db.ref(`/jars/${jarId}`).update(updatedJar);
    }),
  ]);
};

// Remove transaction
export const removeTransactionFromJar = (transactionId, jarId) => {
  return Promise.all([
    db.ref(`jars/${jarId}/history/${transactionId}/amount`).once('value')
    .then((transactionAmount: any) =>
      db.ref(`jars/${jarId}`).once('value').then((jar: any) => {
        const updatedJar = {
          ...jar,
          amount: jar.amount - Number(transactionAmount),
        };
        db.ref(`/jars/${jarId}`).update(updatedJar);
      })
    ),
    db.ref(`jars/${jarId}/history/${transactionId}`).remove(),
  ]);
};

// Get all the jars by the user id
export const getJarsByUserId = (userId) => {
  return db.ref(`/jars`).orderByChild('owner').equalTo(userId).once('value');
};