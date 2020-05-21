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

import { setChatRecipient } from '../redux/chatRecipient';
import { getUser } from '../persistence/firebase';

function ViewChats({ navigation }) {
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();

  function goToNewChatScreen() {
    navigation.navigate('NewChat');
  }

  function goToSingleChat(userId) {
    getUser(userId, documentSnapshot => {
      dispatch(setChatRecipient(documentSnapshot));
      navigation.navigate('SingleChat');
    });
  }

  function renderListItem({ item }) {
    const messagesFromSender = messages[item];
    const lastMessage = messagesFromSender.messages[0].text;
    return (
      <List.Item
        title={messagesFromSender.otherUser.firstName}
        description={lastMessage}
        descriptionNumberOfLines={1}
        titleStyle={styles.listTitle}
        onPress={() => goToSingleChat(item)}
      />
    )
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
          renderItem={renderListItem}
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