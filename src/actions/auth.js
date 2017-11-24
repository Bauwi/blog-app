import { firebase, googleAuthProvider, githubAuthProvider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid
});

// select the login provider
export const startLogin = socialLogin => () => {
  const provider = socialLogin === 'google' ? googleAuthProvider : githubAuthProvider;
  return firebase.auth().signInWithPopup(provider);
};
export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => () => firebase.auth().signOut();
