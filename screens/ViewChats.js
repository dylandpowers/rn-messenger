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
import { setConversationId } from '../redux/conversation';
import { setChatRecipient } from '../redux/chatRecipient';

function ViewChats({ navigation }) {
  const conversations = useSelector(state => state.firebase.profile.conversations);
  const dispatch = useDispatch();

  function goToUserSelectScreen() {
    navigation.navigate('UserSelect');
  }

  function goToSingleChat(conversation) {
    dispatch(setConversationId(conversation.targetId));
    dispatch(setChatRecipient(conversation.otherUser));
    navigation.navigate('SingleChat');
  } 

  function renderListItem({ item }) {
    return (
      <List.Item
        title={item.otherUser.name}
        description={item.lastMessageText}
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
          onPress={goToUserSelectScreen}
        />
      </Appbar.Header>
      {!conversations || conversations.length === 0 ? (
        <View style={styles.noMessagesContainer}>
          <Text style={styles.titleText}>You have no messages</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderListItem}
          keyExtractor={item => item.targetId}
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