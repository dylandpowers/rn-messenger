import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import AppNavigator from './navigator';
import store from './redux/store';
import { initializeApp } from './persistence/firebase';

export default function App() {
  initializeApp();
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  );
}
