import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Appbar, Searchbar, List } from 'react-native-paper';

import { setChatRecipient } from '../redux/chatRecipient';
import { setConversationId } from '../redux/conversation';
import { useFirestore } from 'react-redux-firebase';

function UserSelect({ navigation }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { uid } = useSelector(state => state.firebase.auth);
  const { name } = useSelector(state => state.firebase.profile);
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const [dataHolder, setDataHolder] = useState([]); // for searching

  useEffect(() => {
    firestore.collection('users')
      .get()
      .then((querySnapshot) => {
        const fetchedUsers = [];
        querySnapshot.forEach((querySnapshot) => {
          if (querySnapshot.id !== uid) {
            fetchedUsers.push(querySnapshot);
          }
        });
        setUsers(fetchedUsers);
        setDataHolder(fetchedUsers);
        setIsLoading(false);
      }).catch((err) => alert(err.message));
  }, []);

  function filterData(searchText) {
    const newUserData = dataHolder.filter(user => {
      const userData = user.data();
      const userName = userData.name.toUpperCase();
      const searchTextUpperCase = searchText.toUpperCase();

      return userName.indexOf(searchTextUpperCase) > -1;
    });

    setUsers(newUserData);
  }

  function back() {
    navigation.goBack();
  }

  function onSelectRecipient(recipient) {
    createNewConversation(recipient)
      .then((conversationId) => {
        dispatch(setChatRecipient({
          id: recipient.id,
          name: recipient.data().name
        }));
        dispatch(setConversationId(conversationId));
        navigation.navigate('NewMessage');
      })
      .catch((err) => alert(err.message));
  }

  async function createNewConversation(recipient) {
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
              name: recipient.data().name
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
      <Appbar.Header style={styles.headerContainer}>
        <Appbar.BackAction onPress={back} />
        <Appbar.Content title='Select Recipient' />
      </Appbar.Header>
      <View style={styles.container}>
        <Searchbar
          placeholder='Search'
          onChangeText={text => filterData(text)}
        />
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator />
          </View>
        )  : ( 
        <FlatList
          data={users}
          renderItem={({ item }) => 
            <List.Item
              title={item.data().name}
              onPress={() => onSelectRecipient(item)} 
            />
          }
          keyExtractor={item => item.id.toString()}
        />
        )}
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
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default UserSelect;