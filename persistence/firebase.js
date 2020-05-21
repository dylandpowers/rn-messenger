import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDbAIvGW1Dasyhs1Vqnpn1cme-dlUSm8x4",
  authDomain: "messenger-clone-112c7.firebaseapp.com",
  databaseURL: "https://messenger-clone-112c7.firebaseio.com",
  projectId: "messenger-clone-112c7",
  storageBucket: "messenger-clone-112c7.appspot.com",
  messagingSenderId: "759743330712",
  appId: "1:759743330712:web:41c5a9fc558f42581493ed"
};

export function initializeApp() {
  firebase.initializeApp(firebaseConfig);
}

export function getUser(userId, callback) {
  firebase.firestore().collection('users').doc(userId).get()
    .then(documentSnapshot => callback(documentSnapshot));
}

export function signUp(email, password, firstName, lastName, callback) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        firebase.firestore().collection('users').doc(userCredential.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            email: email
          })
          .then(() => callback(userCredential.user.uid))
          .catch((error) => alert(error.message));
      })
      .catch((error) => alert(error.message));
}