const SET_CONVERSATION_ID = 'SET_CONVERSATION_ID';

export function setConversationId(conversationId) {
  return {
    type: SET_CONVERSATION_ID,
    conversationId
  };
}

export default function conversation(state = '', action) {
  switch (action.type) {
    case SET_CONVERSATION_ID:
      return action.conversationId;
    default:
      return state;
  }
}