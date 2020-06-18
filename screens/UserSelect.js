import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Searchbar, List, ActivityIndicator } from 'react-native-paper';

import { setChatRecipient } from '../redux/chatRecipient';
import { setConversationId } from '../redux/conversation';
import { useFirestore } from 'react-redux-firebase';

function UserSelect({ navigation }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { uid } = useSelector(state => state.firebase.auth);
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const [dataHolder, setDataHolder] = useState([]); // for searching

  useEffect(() => {
    firestore.collection(`users/${uid}/conversations`)
      .get()
      .then((convoQuerySnapshot) => {
        const existingConvoUserIds = [];
        convoQuerySnapshot.forEach((conversation) => {
          existingConvoUserIds.push(conversation.data().otherUser.id);
        });
        firestore.collection('users')
          .get()
          .then((querySnapshot) => {
            const fetchedUsers = [];
            querySnapshot.forEach((querySnapshot) => {
              if (querySnapshot.id !== uid && !existingConvoUserIds.includes(querySnapshot.id)) {
                fetchedUsers.push(querySnapshot);
              }
            });
            setUsers(fetchedUsers);
            setDataHolder(fetchedUsers);
            setIsLoading(false);
        })
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
    setIsLoading(true);
    dispatch(setChatRecipient({
      id: recipient.id,
      name: recipient.data().name
    }));
    navigation.navigate('NewMessage');
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
            <ActivityIndicator style={styles.activityIndicator}/>
          </View>
        ) : ( 
        <FlatList
          data={users}
          renderItem={({ item }) => {
            const user = item.data();
            return (
              <List.Item
                title={user.name}
                description={user.email}
                onPress={() => onSelectRecipient(item)} 
              />
            )
          }}
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
  },
  activityIndicator: {
    backgroundColor: '#ccccff'
  }
});

export default UserSelect;