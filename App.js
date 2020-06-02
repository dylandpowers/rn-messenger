import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import firebase from 'firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import AppNavigator from './navigator';
import store from './redux/store';
import { initializeApp } from './persistence/firebase';

initializeApp();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </ReactReduxFirebaseProvider>
    </StoreProvider>
  );
}
