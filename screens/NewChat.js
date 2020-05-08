import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, FAB } from 'react-native-paper';

function NewChat({ route, navigation }) {
  const [recipientId, setRecipientId] = useState('');
  const [messageText, setMessageText] = useState('');
  const currentUser = useSelector(state => state.user);

  function back() {
    navigation.goBack();
  }

  function onSendMessage() {
    navigation.state.params.newMessage({ sender: currentUser, recipientId, messageText });
    back();
  }

  return (
    <>
      <Appbar.Header style={styles.headerContainer}>
        <Appbar.BackAction onPress={back} />
        <Appbar.Content title='New Message' />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          label='Send message to...'
          value={recipientId}
          mode='outlined'
          onChangeText={setRecipientId}
          style={styles.titleText}
        />
        <TextInput
          label='Message'
          value={messageText}
          onChangeText={setMessageText}
          mode='flat'
          multiline={true}
          style={styles.messageText}
          scrollEnabled={true}
          returnKeyType='done'
          blurOnSubmit={true}
        />
        <FAB
          icon='check'
          small
          style={styles.fab}
          disabled={messageText === '' || recipientId === ''}
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
  headerContainer: {
    backgroundColor: '#ccccff'
  },
  titleText: {
    fontSize: 20
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
})

export default NewChat;