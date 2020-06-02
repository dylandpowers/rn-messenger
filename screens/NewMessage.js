import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, FAB } from 'react-native-paper';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

function NewMessage({ route, navigation }) {
  const [message, setMessage] = useState('');
  const { uid } = useSelector(state => state.firebase.auth);
  const { name } = useSelector(state => state.firebase.profile);
  const conversationId = useSelector(state => state.conversation);
  const firestore = useFirestore();

  function back() {
    navigation.goBack();
  }

  function onSendMessage() {
    firestore.collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .add({
        text: message,
        createdAt: new Date(),
        user: {
          _id: uid,
          name
        }
      }).then((docRef) => {
        docRef.update({
          _id: docRef.id
        });
      }).then(() => {
        navigation.navigate('SingleChat');
      })
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={back} />
        <Appbar.Content title='New Message' />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          label='Message'
          value={message}
          onChangeText={setMessage}
          style={styles.messageText}
          mode='flat'
          scrollEnabled={true}
          multiline={true}
          blurOnSubmit={true}
          returnKeyType='send'
        />
        <FAB
          icon='send'
          small
          style={styles.fab}
          disabled={message === ''}
          onPress={onSendMessage}
        />
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
  header: {
    backgroundColor: '#ccccff'
  },
  messageText: {
    height: 300,
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccccff'
  }
});

export default NewMessage;