export const SIGN_IN = 'SIGN_IN';

const initialState = {
  id: 'dp',
  firstName: 'Dylan',
  lastName: 'Powers',
  email: 'dylandpowers@gmail.com',
  avatar: "https://facebook.com"
};

export function signIn(user) {
  return {
    type: SIGN_IN,
    user
  }
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return action.user;
    default:
      return state;
  }
}