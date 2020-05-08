import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

function Header(
  { 
    titleText,
    backAction,
    backExists,
    messageAction,
    messageExists
  }) 
  {
    return (
      <Appbar.Header style={styles.headerContainer}>
        {backExists ? (
          <Appbar.BackAction onPress={backAction} />
        ) : (
          null
        )}
        <Appbar.Content title={titleText} />
        {messageExists ? (
          <Appbar.Action
            icon='message'
            onPress={messageAction}
          />
        ) : (
          null
        )}
      </Appbar.Header>
    );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ccccff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  title: {
    color: '#2e7166'
  }
});

export default Header;