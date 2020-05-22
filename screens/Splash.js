import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import SecureStore from 'expo-secure-store'

import { getUser } from '../persistence/firebase';
import { signIn } from '../redux/user';
import { SECURE_STORE_CREDENTIALS } from '../persistence/DbConstants';

function Splash({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    SecureStore.getItemAsync(SECURE_STORE_CREDENTIALS)
      .then((credentials) => {
        if (credentials) {
          const { id, email, password } = JSON.parse(credentials);
        } else {
          navigation.navigate('Login');
        }
      })
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