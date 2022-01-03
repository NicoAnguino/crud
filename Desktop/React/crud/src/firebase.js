import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBGTcF6g8bBHxMLe8ExAdxyrd2xV86nexo",
    authDomain: "crud-57750.firebaseapp.com",
    projectId: "crud-57750",
    storageBucket: "crud-57750.appspot.com",
    messagingSenderId: "977147098488",
    appId: "1:977147098488:web:bb204a54c7fd659b8c048d"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)