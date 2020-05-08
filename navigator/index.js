import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ViewChats from '../screens/ViewChats';
import NewChat from '../screens/NewChat';
import SingleChat from '../screens/SingleChat';

const navigator = createStackNavigator(
  {
    ViewChats: {
      screen: ViewChats
    },
    NewChat: {
      screen: NewChat,
      navigationOptions: {
        mode: 'modal'
      }
    },
    SingleChat: {
      screen: SingleChat
    }
  },
  {
    initialRouteName: 'ViewChats',
    headerMode: 'none'
  }
);

export default createAppContainer(navigator);