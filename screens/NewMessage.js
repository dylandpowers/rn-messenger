import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, FAB, ActivityIndicator } from 'react-native-paper';
import { useFirestore } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setConversationId } from '../redux/conversation';

function NewMessage({ navigation }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { uid } = useSelector(state => state.firebase.auth);
  const { name } = useSelector(state => state.firebase.profile);

  const chatRecipient = useSelector(state => state.chatRecipient);
  const dispatch = useDispatch();

  const firestore = useFirestore();

  function back() {
    navigation.goBack();
  }

  function onSendMessage() {
    setIsLoading(true);
    createNewConversationAndAddToUsers(chatRecipient)
      .then((conversationId) => {
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
            dispatch(setConversationId(conversationId));
            navigation.navigate('SingleChat');
          })
      }).catch((err) => {
        setIsLoading(false);
        alert(err.message);
      });
  }

  async function createNewConversationAndAddToUsers(recipient) {
    return new Promise((resolve, reject) => {
      firestore.add('conversations', 
      {
        users: [
          firestore.collection('users').doc(uid),
          firestore.collection('users').doc(recipient.id)
        ]
      }).then(({ id }) => addConversationToUsers(id, recipient))
      .then((id) => resolve(id))
      .catch((err) => reject(err));
    });
  }

  async function addConversationToUsers(id, recipient) {
    return new Promise((resolve, reject) => {
      Promise.all([
        firestore.collection(`users/${uid}/conversations`)
          .doc(id)
          .set({
            otherUser: {
              id: recipient.id,
              name: recipient.name
            },
            lastMessageText: ''
          }),
        firestore.collection(`users/${recipient.id}/conversations`)
          .doc(id)
          .set({
            otherUser: {
              id: uid,
              name
            },
            lastMessageText: ''
          })
      ]).then(() => resolve(id))
      .catch((err) => reject(err));
    });
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={back} />
        <Appbar.Content title='New Message' />
      </Appbar.Header>
      {isLoading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator />
        </View>
      ) : (
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
      )}
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
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center'
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