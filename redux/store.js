import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import messages from './messages';
import user from './user';
import chatRecipient from './chatRecipient';
import conversation from './conversation';

const rootReducer = combineReducers({
  messages,
  user,
  chatRecipient,
  conversation,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const store = createStore(rootReducer);

export default store;