import React from 'react';
import { 
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import {
  Text,
  List,
  Appbar,
  ActivityIndicator
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setConversationId } from '../redux/conversation';
import { setChatRecipient } from '../redux/chatRecipient';
import { useFirestoreConnect } from 'react-redux-firebase';

function ViewChats({ navigation }) {
  const { uid } = useSelector((state) => state.firebase.auth);

  useFirestoreConnect({
    collection: `users/${uid}/conversations`,
    storeAs: 'conversations'
  });

  const conversations = useSelector((state) => state.firestore.data.conversations);

  const dispatch = useDispatch();

  function goToUserSelectScreen() {
    navigation.navigate('UserSelect');
  }

  function goToSingleChat(conversation) {
    dispatch(setConversationId(conversation));
    dispatch(setChatRecipient(conversations[conversation].otherUser));
    navigation.navigate('SingleChat');
  }

  function renderListItem({ item }) {
    const conversation = conversations[item];
    return (
      <List.Item
        title={conversation.otherUser.name}
        description={conversation.lastMessageText}
        descriptionNumberOfLines={1}
        titleStyle={styles.listTitle}
        onPress={() => goToSingleChat(item)}
      />
    )
  }

  let viewToRender;
  if (!conversations) {
    viewToRender = (
      <View style={styles.centeredContainer}>
        <ActivityIndicator style={styles.activityIndicator} />
      </View>
    );
  } else if (conversations.length === 0) {
    viewToRender = (
      <View style={styles.centeredContainer}>
        <Text style={styles.titleText}>You have no messages</Text>
      </View>
    );
  } else {
    viewToRender = (
      <FlatList
        data={Object.keys(conversations)}
        renderItem={renderListItem}
        keyExtractor={item => item}
      />
    );
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
      {viewToRender}
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
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 20
  },
  listTitle: {
    fontSize: 20
  },
  activityIndicator: {
    backgroundColor: '#ccccff'
  }
});

export default ViewChats;