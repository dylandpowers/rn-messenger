export const SET_CHAT_RECIPIENT = 'SET_CHAT_RECIPIENT';

export function setChatRecipient(user) {
  return {
    type: SET_CHAT_RECIPIENT,
    user
  };
}

export default function chatRecipient(state = {}, action) {
  switch (action.type) {
    case SET_CHAT_RECIPIENT:
      return action.user;
    default:
      return state;
  }
}