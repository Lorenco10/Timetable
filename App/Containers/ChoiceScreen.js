import React, { Component } from 'react';
import {
  NetInfo,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
  AsyncStorage,
  Easing,
  Text
} from 'react-native';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { parseString } from 'react-native-xml2js';
import Animation from 'lottie-react-native';
import { Images, Colors } from '../Themes';

// Styles
import styles from './Styles/ChoiceScreenStyle';

class ChoiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deget: [],
      orariStudent: [],
      orariPedagog: [],
      pedagoget: [],
      toggle: false,
      student: true,
      loading: false,
      isConnected: false,
      showAlert: false,
      errorMessage: 'No Network Detected'
    };

    this.textAnim = new Animated.Value(0);
    this.toggleAnim = new Animated.Value(0);

    this.fetchData = this.fetchData.bind(this);
    this.animate = this.animate.bind(this);
    this.storeItem = this.storeItem.bind(this);
    this.retrieveItem = this.retrieveItem.bind(this);
    this.animateToggle = this.animateToggle.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentDidMount() {
    //NativeModules.NavigationBarAndroid.hide();
    SplashScreen.hide();
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ isConnected });
    });
    this.animation.reset();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange(isConnected) {
    this.setState({ isConnected });
  }

  async storeItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {}
  }

  async retrieveItem(key, key2) {
    try {
      const value = await AsyncStorage.getItem(key);
      const value2 = await AsyncStorage.getItem(key2);
      if (value !== null && value2 !== null) {
        return { val1: JSON.parse(value), val2: JSON.parse(value2) };
      }
      return value;
    } catch (error) {
      //console.log(error.message);
    }
  }

  fetchData(orariStudent1, deget1, orariPedagog1, pedagoget1) {
    const { navigation } = this.props;
    if (this.state.student && orariStudent1 === null && deget1 === null) {
      axios
        .all([
          axios.get('http://37.139.119.36:81/orari/getXMLFile/xmlDeget'),
          axios.get('http://37.139.119.36:81/orari/getXMLFile/xmlStudentet')
        ])
        .then(
          axios.spread((deget, orariS) => {
            parseString(deget.data, (err, degetList) => {
              this.storeItem('deget', JSON.stringify(degetList.deget.slot));
              this.setState({ deget: degetList.deget.slot });
            });
            parseString(orariS.data, (err, orariStudent) => {
              this.storeItem('orariStudent', JSON.stringify(orariStudent.orari.slot));
              this.setState({ orariStudent: orariStudent.orari.slot, loading: false }, () => {
                navigation.navigate('LaunchScreen', {
                  student: this.state.student,
                  orari: this.state.student ? this.state.orariStudent : this.state.orariPedagog,
                  deget: this.state.student ? this.state.deget : null,
                  pedagoget: this.state.student ? this.state.pedagoget : null
                });
              });
            });
            this.animation.reset();
          })
        )
        .catch(() => {
          this.setState({ showAlert: true, errorMessage: 'Failed to fetch data' });
        });
    } else if (!this.state.student && orariPedagog1 === null && pedagoget1 === null) {
      axios
        .all([
          axios.get('http://37.139.119.36:81/orari/getXMLFile/xmlPedagoget'),
          axios.get('http://37.139.119.36:81/orari/getXMLFile/xmlPedagog')
        ])
        .then(
          axios.spread((orariP, pedagoget) => {
            parseString(pedagoget.data, (err, pedagogetList) => {
              this.storeItem('pedagoget', JSON.stringify(pedagogetList.pedagoget.slot));
              this.setState({ pedagoget: pedagogetList.pedagoget.slot });
            });
            parseString(orariP.data, (err, orariPedagog) => {
              this.storeItem('orariPedagog', JSON.stringify(orariPedagog.pedagoget));
              this.setState(
                { orariPedagog: orariPedagog.pedagoget.pedagog, loading: false },
                () => {
                  navigation.navigate('LaunchScreen', {
                    student: this.state.student,
                    orari: this.state.student ? this.state.orariStudent : this.state.orariPedagog,
                    deget: this.state.student ? this.state.deget : null,
                    pedagoget: !this.state.student ? this.state.pedagoget : null
                  });
                }
              );
            });
            this.animation.reset();
          })
        )
        .catch(() => {
          this.setState({ showAlert: true, errorMessage: 'Failed to fetch data' });
        });
    } else {
      this.setState({ loading: true, showAlert: false }, () => {
        setTimeout(() => {
          this.setState(
            {
              orariStudent: orariStudent1,
              orariPedagog: orariPedagog1.pedagog,
              deget: deget1,
              loading: false,
              pedagoget: pedagoget1
            },
            () => {
              this.animation.reset();
              navigation.navigate('LaunchScreen', {
                student: this.state.student,
                orari: this.state.student ? this.state.orariStudent : this.state.orariPedagog,
                deget: this.state.student ? this.state.deget : null,
                pedagoget: !this.state.student ? this.state.pedagoget : null
              });
            }
          );
        }, 250);
      });
    }
  }
  animate(open) {
    Animated.timing(this.textAnim, {
      toValue: open ? 1 : 0,
      useNativeDriver: true,
      duration: 400
    }).start();
  }

  animateToggle(move) {
    Animated.timing(this.toggleAnim, {
      toValue: move ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.back(0.01))
    }).start();
  }

  render() {
    const opacityS = this.textAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.3],
      extrapolate: 'clamp'
    });
    const scaleS = this.textAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.3],
      extrapolate: 'clamp'
    });
    const movexS = this.textAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -150],
      extrapolate: 'clamp'
    });
    const moveyS = this.textAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80],
      extrapolate: 'clamp'
    });
    const opacityP = this.textAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
      extrapolate: 'clamp'
    });
    const scaleP = this.textAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
      extrapolate: 'clamp'
    });
    const movexP = this.textAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50],
      extrapolate: 'clamp'
    });
    const moveyP = this.textAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
      extrapolate: 'clamp'
    });
    const translateX = this.toggleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['60%', '-1%'],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.mainContainer}>
        <StatusBar translucent backgroundColor={Colors.transparent} />
        <LinearGradient colors={['#141E30', '#243B55']} style={styles.background} />
        <View style={styles.centered}>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              position: 'absolute',
              marginTop: '65%',
              width: 200,
              height: 200
            }}
            speed={!this.state.toggle ? 5 : 1}
            source="loading_dots.json"
          />
          <Image source={Images.launch1} style={styles.logo} />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.textContainer}
            onPress={() => {
              this.animate(this.state.student);
              this.setState({ student: !this.state.student });
            }}
          >
            <Animated.Text
              style={[
                styles.text,
                {
                  opacity: opacityP,
                  transform: [{ scale: scaleP }, { translateX: movexP }, { translateY: moveyP }]
                }
              ]}
            >
              P
            </Animated.Text>
            <Animated.Text
              style={[
                styles.text,
                {
                  opacity: opacityS,
                  transform: [{ scale: scaleS }, { translateX: movexS }, { translateY: moveyS }]
                }
              ]}
            >
              S
            </Animated.Text>
          </TouchableOpacity>
        </View>
        {this.state.showAlert ? (
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>{this.state.errorMessage}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (!this.state.student) {
              this.retrieveItem('orariPedagog', 'pedagoget').then(pedagogetOrari => {
                if (pedagogetOrari !== null && !this.state.toggle) {
                  this.animation.play();
                  this.fetchData([], [], pedagogetOrari.val1, pedagogetOrari.val2);
                } else {
                  this.setState(
                    {
                      loading: this.state.isConnected,
                      showAlert: !this.state.isConnected,
                      errorMessage: 'No Network Detected'
                    },
                    () => {
                      if (this.state.isConnected) {
                        this.animation.play();
                        this.fetchData([], [], null, null);
                      }
                    }
                  );
                }
              });
            } else {
              this.retrieveItem('orariStudent', 'deget').then(degetOrari => {
                if (degetOrari !== null && !this.state.toggle) {
                  this.animation.play();
                  this.fetchData(degetOrari.val1, degetOrari.val2, [], []);
                } else {
                  this.setState(
                    {
                      loading: this.state.isConnected,
                      showAlert: !this.state.isConnected,
                      errorMessage: 'No Network Detected'
                    },
                    () => {
                      if (this.state.isConnected) {
                        this.animation.play();
                        this.fetchData(null, null, [], []);
                      }
                    }
                  );
                }
              });
            }
          }}
        >
          <Icon name="navigate-next" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setTimeout(() => {
              this.setState({ toggle: !this.state.toggle });
            }, 0.01);
            this.animateToggle(!this.state.toggle);
          }}
          style={styles.toggleBox}
        >
          <View style={styles.toggleContainer}>
            <Animated.View
              style={[
                styles.toggleCircle,
                {
                  marginRight: translateX,
                  backgroundColor: this.state.toggle ? Colors.toggleActive : Colors.togglePassive
                }
              ]}
            />
          </View>
        </TouchableOpacity>
        <View style={[styles.toggleBox, { top: '93.2%', left: '5.1%' }]}>
          <Text style={styles.toggleText}>Update</Text>
        </View>
      </View>
    );
  }
}

export default ChoiceScreen;
