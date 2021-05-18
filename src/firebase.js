import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDteAj_kocVwlNoVfywCFmdgeLXc_FOcPY',
  authDomain: 'rate-me-46c85.firebaseapp.com',
  databaseURL: 'https://rate-me-46c85.firebaseio.com',
  projectId: 'rate-me-46c85',
  storageBucket: 'rate-me-46c85.appspot.com',
  messagingSenderId: '277954023030',
  appId: '1:277954023030:web:a0f42bf3c4803c67331957',
  measurementId: 'G-WRS488FYB7'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

export {
  db,
  auth
}
