import { StackNavigator } from 'react-navigation';
import ChoiceScreen from '../Containers/ChoiceScreen';
import MainScreen from '../Containers/MainScreen';
import LaunchScreen from '../Containers/LaunchScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    ChoiceScreen: { screen: ChoiceScreen },
    LaunchScreen: { screen: LaunchScreen },
    MainScreen: { screen: MainScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'ChoiceScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
