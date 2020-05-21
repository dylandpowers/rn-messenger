import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Appbar, Searchbar, List } from 'react-native-paper';

import { setChatRecipient } from '../redux/chatRecipient';
import { firestore } from '../persistence/firebase';
import { FlatList } from 'react-native-gesture-handler';

function NewChat({ navigation }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [dataHolder, setDataHolder] = useState([]); // for searching

  useEffect(() => {
    firestore.collection('users')
      .get()
      .then((querySnapshot) => {
        const fetchedUsers = [];
        querySnapshot.forEach((querySnapshot) => {
          if (querySnapshot.id !== currentUser.id) {
            fetchedUsers.push(querySnapshot);
          }
        });
        setUsers(fetchedUsers);
        setDataHolder(fetchedUsers);
        setIsLoading(false);
      }).catch((err) => {
        setIsError(true);
      });
  }, []);

  function filterData(searchText) {
    const newUserData = dataHolder.filter(user => {
      const userData = user.data();
      const userName = `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}`;
      const searchTextUpperCase = searchText.toUpperCase();

      return userName.indexOf(searchTextUpperCase) > -1;
    });

    setUsers(newUserData);
  }

  function back() {
    navigation.goBack();
  }

  function onSelectRecipient(recipient) {
    dispatch(setChatRecipient(recipient));
    navigation.navigate('SingleChat');
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
              title={item.data().firstName + ' ' + item.data().lastName}
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

export default NewChat;