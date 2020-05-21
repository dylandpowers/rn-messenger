import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

import { signIn } from '../redux/user';
import { signUp } from '../persistence/firebase'

function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function back() {
    navigation.goBack();
  }

  function _signUp() {
    signUp(email, password, firstName, lastName, (userId) => {
      dispatch(signIn({
        id: userId,
        firstName,
        lastName,
        email,
        avatar: ''
      }));
      goToViewChats();
    });
  }

  function goToViewChats() {
    navigation.navigate('ViewChats');
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={back} />
        <Appbar.Content title='Sign Up' />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          placeholder='First Name'
          mode='outlined'
          value={firstName}
          onChangeText={setFirstName}
          style={styles.textInput}
        />
        <TextInput
          placeholder='Last Name'
          mode='outlined'
          value={lastName}
          onChangeText={setLastName}
          style={styles.textInput}
        />
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
          returnKeyType='done'
        />
        <Button
          icon='check'
          mode='contained'
          dark={false}
          style={styles.button}
          onPress={_signUp}
        >
          Sign Up
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
  }
});

export default SignUp;