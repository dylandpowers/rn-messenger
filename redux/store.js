import { createStore, combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import chatRecipient from './chatRecipient';

const rootReducer = combineReducers({
  messages,
  user,
  chatRecipient
});

const store = createStore(rootReducer);

export default store;