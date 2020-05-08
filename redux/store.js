import { createStore, combineReducers } from 'redux';
import messages from './messages';
import user from './user';

const rootReducer = combineReducers({
  messages,
  user
});

const store = createStore(rootReducer);

export default store;