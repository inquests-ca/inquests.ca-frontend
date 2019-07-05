import * as firebase from 'firebase/app';

import 'firebase/auth';

export function init() {
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
}

export function signIn(email, password, onError) {
  // TODO: use async await syntax.
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      onError(error.code);
    });
}

export function signUp(email, password, onError) {
  // TODO: use async await syntax.
  // TODO: consider using Firebase Admin SDK to handle account creation.
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      onError(error.code);
    });
}

export function isUserSignedIn() {
  return firebase.auth().currentUser !== null;
}

export async function fetchWithAuthentication(url, options) {
  if (!isUserSignedIn())
    throw new Error('No user is signed in, cannot authenticate request.');

  const token = await firebase.auth().currentUser.getIdToken();
  // TODO: determine what options to set here.
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    },
    credentials: 'same-origin'
  });
  return response;
}
