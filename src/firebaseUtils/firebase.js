import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDeHiedWgxOgv6VdLbcd7Q4FjMUn4f5UlE",
  authDomain: "elemental-card.firebaseapp.com",
  databaseURL: "https://elemental-card.firebaseio.com",
  projectId: "elemental-card",
  storageBucket: "elemental-card.appspot.com",
  messagingSenderId: "1044669043876"
};

firebase.initializeApp(config);

export default firebase;
