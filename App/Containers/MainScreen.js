import React, { Component } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/MaterialIcons';
/* import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'; */
import { Colors, Metrics } from '../Themes';
import TopTabScreen from './TopTabScreen';

// Styles
//import styles from './Styles/MainScreenStyle';

const actions = [
  {
    //text: 'Card Style',
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
      email: props.navigation.state.params.email,
      pedagogu: props.navigation.state.params.pedagogu,
      changeCard: true
    };

    this.orderedCards = this.orderedCards.bind(this);
    this.getDay = this.getDay.bind(this);
  }

  getDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  }

  orderedCards() {
    if (this.state.pedagogu !== null) {
      const orderedOrari = this.state.orari.filter(prop => {
        if (this.state.email === prop.$.email) {
          return prop;
        }
        return null;
      });
      return orderedOrari;
    }

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
        <TopTabs
          style={{ flex: 1 }}
          screenProps={{
            orari: this.orderedCards(),
            pedagogu: this.state.pedagogu,
            changeCard: this.state.changeCard
          }}
        />
        <FloatingAction
          ref={ref => {
            this.floatingAction = ref;
          }}
          actions={actions}
          color={Colors.actionButton}
          distanceToEdge={55}
          onPressItem={name => {
            if (name === 'bt_card') {
              this.floatingAction.animateButton();
              setTimeout(() => {
                this.setState({
                  changeCard: !this.state.changeCard
                });
              }, 0.01);
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
