# rn-messenger
![logo](./assets/logo.png)

This is a simple messaging app built on React Native, Expo, and Firebase/Firestore. In this app you can chat other users also on the platform by either starting new conversations or viewing existing ones.

## UI
All frontend components are taken from [react-native-paper](https://www.npmjs.com/package/react-native-paper), which is a React Native implementation of Google's [Material UI](https://material.io). The navigation is done via [react-navigation](https://www.npmjs.com/package/react-navigation), a very popular library for navigation in React Native apps. React Native provides a built-in `StyleSheet` class for adding custom styles to existing components.

The chat feature is built with [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat), an excellent framework for embedding chat functionality in apps.

## State Management
State for this app is managed using [redux](https://redux.js.org/), with a special firebase integration provided by [react-redux-firebase](https://www.npmjs.com/package/react-redux-firebase) and [redux-firestore](https://www.npmjs.com/package/redux-firestore). The `redux-firestore` library makes it possible to listen to collections while simultaneously making them a part of the global state.

## Data Storage
As alluded to, data for this app is stored in [Firestore](https://firebase.google.com/docs/firestore), a document-based database which comes as a part of Firebase. Authentication is also managed through Firebase.

## Build
This app is built with [Expo](https://expo.io/). 