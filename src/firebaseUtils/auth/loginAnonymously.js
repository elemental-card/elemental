import firebase from '../firebase';

export default () => {
  firebase.auth().signInAnonymously();

  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      }
    });
  });
};
