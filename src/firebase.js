import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6bVDIvpWLDyYJz4QkF2NmhgXvJBHIRUc",
  authDomain: "quick-question-52c98.firebaseapp.com",
  databaseURL: "https://quick-question-52c98.firebaseio.com",
  projectId: "quick-question-52c98",
  storageBucket: "quick-question-52c98.appspot.com",
  messagingSenderId: "22119863404",
  appId: "1:22119863404:web:e55deb0c20dfaae094b449"
};
  // Initialize Firebase
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const storage= firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{storage,db,provider, firebase as default}; 