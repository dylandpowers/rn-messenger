import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store'

import { useFirebase } from 'react-redux-firebase';
import { getCredentials } from '../persistence/localStorage';

function Splash({ navigation }) {
  const firebase = useFirebase();

  useEffect(() => {
    getCredentials()
      .then((credentials) => {
        if (credentials) {
          const { email, password } = credentials;
          firebase.login({
            email,
            password
          })
          .then(() => navigation.navigate('ViewChats'))
          .catch((err) => alert(err.message));
        } else {
          navigation.navigate('Login');
        }
      })
      .catch((err) => alert(err.message))
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to React Native Messenger!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'  
  },
  title: {
    fontSize: 20
  }
});

export default Splash;