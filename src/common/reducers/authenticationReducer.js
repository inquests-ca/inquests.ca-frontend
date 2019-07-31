import { SET_CURRENT_USER } from '../actions';

export default function authenticationReducer(
  state = { currentUser: undefined },
  action
) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.currentUser };
    default:
      return state;
  }
}
