import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDPe1F4lsCVALqEsfDXLRH3FolSU46p5Lw',
  authDomain: 'inquestsca.firebaseapp.com',
  databaseURL: 'https://inquestsca.firebaseio.com',
  projectId: 'inquestsca',
  storageBucket: '',
  messagingSenderId: '333226893223',
  appId: '1:333226893223:web:b74734e6265833c7'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
