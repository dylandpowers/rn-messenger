import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';
import { useFirebase } from 'react-redux-firebase';
import { saveCredentials } from '../persistence/localStorage';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firebase = useFirebase();

  function goToSignUp() {
    navigation.navigate('SignUp');
  }

  function goToViewChats() {
    navigation.navigate('ViewChats');
  }

  function signIn() {
    firebase.login({
      email,
      password
    })
    .then(() => saveCredentials(email, password))
    .then(goToViewChats);
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title='Sign In' />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          placeholder='Email'
          mode='outlined'
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          placeholder='Password'
          mode='outlined'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.textInput}
          returnKeyType='go'
          blurOnSubmit={true}
        />
        <Button
          icon='check'
          mode='contained'
          style={styles.button}
          dark={false}
          onPress={signIn}
        >
          Sign In
        </Button>
        <Button
          style={styles.signUpButton}
          labelStyle={styles.signUpButtonLabel}
          onPress={goToSignUp}
        >
          New user? Sign up here
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  textInput: {
    marginBottom: 20
  },
  header: {
    backgroundColor: '#ccccff'
  },
  button: {
    backgroundColor: '#ccccff',
    width: '50%',
    alignSelf: 'center',
    marginBottom: 20
  },
  signUpButton: {
    alignSelf: 'center'
  },
  signUpButtonLabel: {
    color: '#ccccff',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  title: {
    fontSize: 20
  }
});

export default Login;