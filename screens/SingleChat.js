import React, { useState } from 'react';
import { StyleSheet, AppState } from 'react-native';
import { Appbar } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

function SingleChat({ navigation }) {
  const [sortedMessages, setSortedMessages] = useState([]);
  const conversationId = useSelector(state => state.conversation);
  const chatRecipient = useSelector(state => state.chatRecipient);
  const { uid } = useSelector(state => state.firebase.auth);
  const { name } = useSelector(state => state.firebase.profile);

  const firestore = useFirestore();

  useFirestoreConnect({
    collection: `conversations/${conversationId}/messages`,
    orderBy: 'createdAt',
    storeAs: 'messages'
  });

  const messages = useSelector((state) => state.firestore.ordered.messages || {});

  AppState.addEventListener('change', (state) => {
    if (state !== 'active') {
      saveLastMessage();
    }
  });

  function saveLastMessage() {
    const messageValues = Object.values(messages);
    const lastMessageText = messageValues[messageValues.length - 1].text;
    firestore.update(`users/${uid}/conversations/${conversationId}`, {
      lastMessageText
    });
    firestore.update(`users/${chatRecipient.id}/conversations/${conversationId}`, {
      lastMessageText
    });
  }

  function back() {
    saveLastMessage();
    navigation.navigate('ViewChats');
  }

  function getMessages() {
    return Object.values(messages)
      .map((message) => {
        return {
          ...message,
          createdAt: message.createdAt.toDate()
        }
      }).reverse();
  }

  function onSend(newMessages) {
    newMessages.forEach((message) => {
      firestore.collection('conversations')
        .doc(conversationId)
        .collection('messages')
        .add(message)
        .then((docRef) => {
          docRef.update({
            _id: docRef.id
          })
        });
    });
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={back} />
        <Appbar.Content title={chatRecipient.name} />
      </Appbar.Header>
      <GiftedChat 
        messages={getMessages()}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ 
          _id: uid,
          name
         }}
      />
    </>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20
  },
  header: {
    backgroundColor: '#ccccff'
  }
});

export default SingleChat;