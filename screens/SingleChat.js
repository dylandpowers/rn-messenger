import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';

import { sendMessage as createSendMessageAction } from '../redux/messages';

function SingleChat({ navigation }) {
  const currentUser = useSelector(state => state.user);
  const recipient = useSelector(state => state.chatRecipient);
  const conversation = useSelector(state => state.messages[recipient.id]);

  const existingMessages = typeof conversation === 'object' ? conversation.messages : [];
  const [messages, setMessages] = useState(existingMessages);
  const dispatch = useDispatch();

  function popToTop() {
    navigation.popToTop();
  }

  function onSend(newMessages) {
    setMessages(GiftedChat.append(messages, newMessages)); 
    newMessages.forEach((message) => dispatch(createSendMessageAction(recipient, message)));
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={popToTop} />
        <Appbar.Content title={recipient.data().firstName} />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: currentUser.id }}
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