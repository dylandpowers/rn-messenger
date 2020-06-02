import * as SecureStore from 'expo-secure-store';
import { SECURE_STORE_CREDENTIALS } from './DbConstants';

export async function saveCredentials(email, password) {
  return new Promise((resolve, reject) => {
    const credentials = JSON.stringify({ email, password });
    SecureStore.setItemAsync(SECURE_STORE_CREDENTIALS, credentials)
      .then(resolve)
      .catch(() => reject({ message: 'Error storing credentials' }));
  });
}

export async function getCredentials() {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(SECURE_STORE_CREDENTIALS)
      .then((credentialsStr) => {
        if (!credentialsStr) {
          resolve(null);
          return;
        }
        const credentials = JSON.parse(credentialsStr);
        resolve(credentials);
      })
      .catch(() => reject({ message: 'Error retrieving stored credentials '}));
  })
}