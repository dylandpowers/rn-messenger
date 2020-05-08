import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';

function SingleChat({ navigation }) {
  const { conversation, otherUser } = navigation.state.params;

  function popToTop() {
    navigation.popToTop();
  }

  function onSend(messages) {
    conversation = GiftedChat.append(conversation, messages);
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={popToTop} />
        <Appbar.Content title={otherUser} />
      </Appbar.Header>
      <GiftedChat
        messages={conversation}
        onSend={messages => onSend(messages)}
        user={{ _id: 'dp' }}
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