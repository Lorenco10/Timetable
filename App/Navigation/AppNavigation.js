//import { StackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import ChoiceScreen from '../Containers/ChoiceScreen';
import MainScreen from '../Containers/MainScreen';
import LaunchScreen from '../Containers/LaunchScreen';

import styles from './Styles/NavigationStyles';

const transitionConfig = {
  duration: 300,
  timing: Animated.timing,
  easing: Easing.easing
};

// Manifest of possible screens
const PrimaryNav = FluidNavigator(
  {
    ChoiceScreen: { screen: ChoiceScreen },
    LaunchScreen: { screen: LaunchScreen },
    MainScreen: { screen: MainScreen }
  },
  {
    transitionConfig,
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'ChoiceScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
