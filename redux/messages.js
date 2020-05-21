export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export function sendMessage(recipient, message) {
  return {
    type: SEND_MESSAGE,
    recipient,
    message
  };
}

export function receiveMessage(sender, message) {
  return {
    type: RECEIVE_MESSAGE,
    sender,
    message
  };
}

export default function messages(state = {}, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      const { id } = action.recipient;
      if (!(id in state)) {
        return {
          ...state,
          [id]: {
            otherUser: action.recipient.data(),
            messages: [action.message]
          } 
        };
      }

      return {
        ...state,
        [id]: {
          ...state[id],
          messages: [action.message, ...state[id].messages]
        }
      };
    case RECEIVE_MESSAGE:
      const senderId = action.sender.id;
      return {
        ...state,
        [senderId]: [
          ...state[senderId],
          action.message
        ]
      };
    default:
      return state;
  }
}