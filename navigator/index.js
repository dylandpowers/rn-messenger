import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ViewChats from '../screens/ViewChats';
import NewChat from '../screens/NewChat';
import SingleChat from '../screens/SingleChat';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Splash from '../screens/Splash';

const navigator = createStackNavigator(
  {
    Splash: {
      screen: Splash
    },
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
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
    initialRouteName: 'Splash',
    headerMode: 'none'
  }
);

export default createAppContainer(navigator);