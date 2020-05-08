export const SIGN_IN = 'SIGN_IN';

const initialState = {
  id: 'dp',
  name: 'Dylan Powers',
  avatar: "https://facebook.com"
};

export function signIn(payload) {
  return {
    type: SIGN_IN,
    payload
  }
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return action.payload;
    default:
      return state;
  }
}