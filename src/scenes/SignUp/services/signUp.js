import * as firebase from 'firebase/app';

export function signUp(email, password, onError) {
  // TODO: use async await syntax
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      onError(error);
    });
}
