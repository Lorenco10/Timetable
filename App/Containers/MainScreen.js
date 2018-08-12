import React, { Component } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import axios from 'axios';
//import _ from 'lodash';
//import { parseString } from 'react-native-xml2js';
//import Spinner from 'react-native-spinkit';
import colors from './colors.json';
import { Colors, Metrics } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import TopTabScreen from './TopTabScreen';

// Styles
//import styles from './Styles/MainScreenStyle';

const actions = [
  {
    text: 'Card Style',
    color: Colors.actionButton,
    icon: <Icon name="swap-vert" size={20} color="white" />,
    name: 'bt_card',
    position: 1
  }
];

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orari: props.navigation.state.params.orari,
      dega: props.navigation.state.params.dega,
      viti: props.navigation.state.params.viti,
      paraleli: props.navigation.state.params.paraleli,
      changeCard: false
    };

    this.orderedCards = this.orderedCards.bind(this);
    this.getDay = this.getDay.bind(this);
  }

  getDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  }

  orderedCards() {
    const orderedOrari = this.state.orari.filter(prop => {
      if (
        this.state.dega === prop.dega[0] &&
        this.state.viti === prop.viti[0] &&
        (this.state.paraleli === prop.paraleli[0] || this.state.paraleli[0] === prop.paraleli[0])
      ) {
        return prop;
      }
      return null;
    });
    return orderedOrari;
  }

  render() {
    //console.log(this.orderedCards());
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <StatusBar hidden />
        {/* {this.state.loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner isVisible size={80} type={'ChasingDots'} color={Colors.button} />
          </View>
        ) : (
          <TopTabs style={{ flex: 1 }} screenProps={{ orari: this.orderedCards() }} />
        )} */}
        <TopTabs
          style={{ flex: 1 }}
          screenProps={{ orari: colors.colors, changeCard: this.state.changeCard }}
        />
        <FloatingAction
          actions={actions}
          // overrideWithAction
          color={Colors.actionButton}
          distanceToEdge={40}
          onPressItem={name => {
            this.setState({
              changeCard: true
            });
            if (name === 'bt_card') {
              this.setState({
                changeCard: true
              });
            }
          }}
        />
      </View>
    );
  }
}

const TopTabs = createMaterialTopTabNavigator(
  {
    M: {
      screen: props => <TopTabScreen {...props} dita="1" />
    },
    T: {
      screen: props => <TopTabScreen {...props} dita="2" />
    },
    W: {
      screen: props => <TopTabScreen {...props} dita="3" />
    },
    TH: {
      screen: props => <TopTabScreen {...props} dita="4" />
    },
    F: {
      screen: props => <TopTabScreen {...props} dita="5" />
    }
  },
  {
    initialRouteName: 'M',
    tabBarPosition: 'top',
    swipeEnabled: true,
    lazyLoad: true,
    initialLayout: {
      height: 0,
      width: Metrics.screenWidth
    },
    animationEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      indicatorStyle: {
        backgroundColor: 'white'
      },
      style: {
        backgroundColor: Colors.background,
        paddingTop: 25
      },
      tabStyle: {
        width: Metrics.screenWidth / 5
      },
      labelStyle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: 'white'
      }
    }
  }
);

export default MainScreen;
