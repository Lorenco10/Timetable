import React, { Component } from 'react';
import { View, Text, Animated, Easing, TouchableOpacity, AsyncStorage } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animation from 'lottie-react-native';
import _ from 'lodash';
import { Colors, Metrics } from '../Themes';
import TopTabScreen from './TopTabScreen';

// Styles
import styles from './Styles/MainScreenStyle';

const TopTabScreenA = new Animated.createAnimatedComponent(TopTabScreen);
const cardAnim = new Animated.Value(0);
const tabAnim = new Animated.Value(0);

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
      changeCard: true,
      emptyRender: true,
      animateOthers: false
    };

    this.orderedCards = this.orderedCards.bind(this);
    this.animate = this.animate.bind(this);
    this.animateT = this.animateT.bind(this);
    this.storeItem = this.storeItem.bind(this);
    this.retrieveItem = this.retrieveItem.bind(this);
  }

  componentDidMount() {
    this.retrieveItem('cardH').then(value => {
      if (value !== null) {
        this.setState({ changeCard: JSON.parse(value) });
      }
    });
    if (!_.isEmpty(this.orderedCards())) {
      setTimeout(() => {
        this.setState({ emptyRender: false }, () => {
          this.animate(true);
          this.animateT();
        });
      }, 0.01);
    }
  }

  animate(fade) {
    Animated.timing(cardAnim, {
      toValue: fade ? 1 : 0,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      if (!fade) {
        this.setState(
          {
            changeCard: !this.state.changeCard
          },
          () => {
            this.storeItem('cardH', JSON.stringify(this.state.changeCard));
          }
        );
        setTimeout(() => {
          this.animate(true);
        }, 200);
      }
    });
  }

  animateT() {
    Animated.timing(tabAnim, {
      toValue: 1,
      duration: 110,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  }

  async storeItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      //console.log(error.message);
    }
  }

  async retrieveItem(key1) {
    try {
      const value = await AsyncStorage.getItem(key1);
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      //console.log(error.message);
    }
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
    const actions = [
      {
        color: Colors.actionButton,
        icon: (
          <Icon
            name={this.state.changeCard ? 'view-grid' : 'view-stream'}
            size={20}
            color="white"
          />
        ),
        name: 'bt_card',
        position: 1
      }
    ];
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <TouchableOpacity
          style={[styles.backButton, { left: _.isEmpty(this.orderedCards()) ? '87%' : '82%' }]}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <Icon name="close" size={18} color={_.isEmpty(this.orderedCards()) ? 'black' : 'white'} />
        </TouchableOpacity>
        {_.isEmpty(this.orderedCards()) ? (
          <View style={styles.errorBox}>
            <Animation
              ref={animation => {
                this.animation = animation;
              }}
              autoPlay
              style={{
                width: Metrics.screenWidth * 0.5,
                height: Metrics.screenWidth * 0.5
              }}
              source="empty.json"
            />
            <View style={styles.messageBox}>
              <Text style={[styles.messageText, { fontWeight: 'bold', fontSize: 14 }]}>
                Not Found
              </Text>
              <Text style={styles.messageText}>Please enter a correct configuration!</Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {!this.state.emptyRender ? (
              <TopTabs
                animateOthers={this.state.animateOthers}
                style={{ flex: 1 }}
                screenProps={{
                  orari: this.orderedCards(),
                  pedagogu: this.state.pedagogu,
                  changeCard: this.state.changeCard
                }}
              />
            ) : null}
            <FloatingAction
              ref={ref => {
                this.floatingAction = ref;
              }}
              actions={actions}
              color={Colors.actionButton}
              distanceToEdge={32}
              onPressItem={name => {
                if (name === 'bt_card') {
                  this.floatingAction.animateButton();
                  setTimeout(() => {
                    this.animate(false);
                  }, 0.01);
                }
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const fadeTab = tabAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 1],
  extrapolate: 'clamp'
});

const opacity = cardAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 1],
  extrapolate: 'clamp'
});

const getDay = () => {
  if (new Date().toLocaleString('en-us', { weekday: 'narrow' }).substring(0, 1) === 'S') {
    return 'M';
  } else if (new Date().toLocaleString('en-us', { weekday: 'short' }).substring(0, 2) === 'Th') {
    return 'TH';
  }
  return new Date().toLocaleString('en-us', { weekday: 'narrow' }).substring(0, 1);
};

const TopTabs = createMaterialTopTabNavigator(
  {
    M: {
      screen: props => (
        <TopTabScreenA
          {...props}
          dita="1"
          style={{
            flex: 1,
            backgroundColor: '#f9f9f9',
            opacity
          }}
        />
      )
    },
    T: {
      screen: props => (
        <TopTabScreenA
          {...props}
          dita="2"
          style={{
            flex: 1,
            backgroundColor: '#f9f9f9',
            opacity
          }}
        />
      )
    },
    W: {
      screen: props => (
        <TopTabScreenA
          {...props}
          dita="3"
          style={{
            flex: 1,
            backgroundColor: '#f9f9f9',
            opacity
          }}
        />
      )
    },
    TH: {
      screen: props => (
        <TopTabScreenA
          {...props}
          dita="4"
          style={{
            flex: 1,
            backgroundColor: '#f9f9f9',
            opacity
          }}
        />
      )
    },
    F: {
      screen: props => (
        <TopTabScreenA
          {...props}
          dita="5"
          style={{
            flex: 1,
            backgroundColor: '#f9f9f9',
            opacity
          }}
        />
      )
    }
  },
  {
    initialRouteName: getDay(),
    tabBarPosition: 'top',
    lazy: true,
    optimizationsEnabled: true,
    initialLayout: {
      height: 0,
      width: Metrics.screenWidth
    },
    //animationEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      indicatorStyle: {
        backgroundColor: 'white'
      },
      style: {
        backgroundColor: Colors.background,
        paddingTop: Metrics.screenHeight * 0.052,
        opacity: fadeTab
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
