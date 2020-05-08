import React from 'react';
import { 
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import {
  Text,
  List,
  Appbar
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { sendMessage as createSendMessageAction } from '../redux/messages';

function ViewChats({ navigation }) {
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();

  function newMessage(message) {
    dispatch(createSendMessageAction(message));
  }

  function goToNewChatScreen() {
    navigation.navigate('NewChat', {
      newMessage
    });
  }

  function goToSingleChat(userId) {

    navigation.navigate('SingleChat', {
      otherUser: userId,
      conversation: messages[userId]
    });
  }

  return (
    <>
      <Appbar.Header style={styles.headerContainer}>
        <Appbar.Content title='Chats' />
        <Appbar.Action
          icon='cellphone-message'
          onPress={goToNewChatScreen}
        />
      </Appbar.Header>
      {messages.length === 0 ? (
        <View style={styles.noMessagesContainer}>
          <Text style={styles.titleText}>You have no messages</Text>
        </View>
      ) : (
        <FlatList
          data={Object.keys(messages)}
          renderItem={({ item }) => {
            const messagesFromSender = messages[item];
            const lastMessage = messagesFromSender[messagesFromSender.length - 1].text;
            return (
              <List.Item
                title={item} // this will be the ID of the message
                description={lastMessage}
                descriptionNumberOfLines={1}
                titleStyle={styles.listTitle}
                onPress={() => goToSingleChat(item)}
              />
          )}}
          keyExtractor={item => item}
        />
      )}

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#ccccff'
  },
  noMessagesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 20
  },
  listTitle: {
    fontSize: 20
  }
});

export default ViewChats;