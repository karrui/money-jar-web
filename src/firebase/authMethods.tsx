import { auth, googleProvider } from './firebase';

// Sign up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign in with email
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign in with Google
export const doSignInWithGoogle = () =>
  auth.signInWithPopup(googleProvider);

// Sign out
export const doSignOut = () =>
  auth.signOut();

// Password reset
export const doPasswordReset = email =>
  auth.sendPasswordResetEmail(email);

// Password change
export const doPasswordUpdate = password =>
  auth.currentUser!.updatePassword(password);

// Set display name
export const doDisplayNameChange = username =>
  auth.currentUser!.updateProfile({
    displayName: username,
    photoURL: null,
  });