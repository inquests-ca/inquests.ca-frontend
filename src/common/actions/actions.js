import { signOut as signOutUser } from '../services/userManagement';
import { getUser } from '../services/userApi';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser
});

export const handleFirebaseInitialized = firebaseUser => async dispatch => {
  if (firebaseUser) {
    // TODO: handle case of error.
    const { user, error } = await getUser();
    if (!error) dispatch(setCurrentUser(user));
  } else {
    dispatch(setCurrentUser(null));
  }
};

export const handleAuthentication = user => setCurrentUser(user);

export const signOut = userData => async dispatch => {
  await signOutUser(userData);
  dispatch(setCurrentUser(null));
};
