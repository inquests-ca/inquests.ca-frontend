import * as firebase from 'firebase/app';

export function signIn(email, password, onError) {
  // TODO: use async await syntax
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      onError(error.code);
    });
}
