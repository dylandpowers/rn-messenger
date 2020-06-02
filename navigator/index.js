import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ViewChats from '../screens/ViewChats';
import UserSelect from '../screens/UserSelect';
import SingleChat from '../screens/SingleChat';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Splash from '../screens/Splash';
import NewMessage from '../screens/NewMessage';

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
    UserSelect: {
      screen: UserSelect
    },
    NewMessage: {
      screen: NewMessage
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