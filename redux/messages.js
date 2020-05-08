export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

let messageId = 0;

export function sendMessage(payload) {
  return {
    type: SEND_MESSAGE,
    id: messageId++,
    payload
  };
}

export function receiveMessage(payload) {
  return {
    type: RECEIVE_MESSAGE,
    id: messageId++,
    payload
  };
}

export default function messages(state = {}, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      const { recipientId } = action.payload;
      if (!(recipientId in state)) {
        return {
          ...state,
          [recipientId]: [
            _createMessageObject(action)
          ]
        };
      }

      return {
        ...state,
        [recipientId]: [
          ...state[recipientId],
          _createMessageObject(action)
        ]
      };
    case RECEIVE_MESSAGE:
      const senderId = action.payload.sender.id;
      return {
        ...state,
        [senderId]: [
          ...state[senderId],
          _createMessageObject(action)
        ]
      };
    default:
      return state;
  }
}

function _createMessageObject(action) {
  const { sender, messageText } = action.payload;
  const id = action.id;
  return {
    _id: id,
    text: messageText,
    createAt: new Date(),
    user: {
      _id: sender.id,
      name: sender.name,
      avatar: sender.avatar || null,
    }
  };
}