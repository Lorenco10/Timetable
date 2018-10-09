import React, { Component } from 'react';
import {
  //Text,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';
import { parseString } from 'react-native-xml2js';
import { Images, Metrics } from '../Themes';

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
      student: true,
      loading: false
    };

    this.textAnim = new Animated.Value(0);

    this.fetchData = this.fetchData.bind(this);
    this.animate = this.animate.bind(this);
    this.storeItem = this.storeItem.bind(this);
    this.retrieveItem = this.retrieveItem.bind(this);
  }

  async storeItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error.message);
    }
  }

  async retrieveItem(key, key2) {
    try {
      const value = await AsyncStorage.getItem(key);
      const value2 = await AsyncStorage.getItem(key2);
      // this.setState({ [`${key}`]: JSON.parse(value) });
      if (value !== null && value2 !== null) {
        return { val1: JSON.parse(value), val2: JSON.parse(value2) };
      }
      return value;
    } catch (error) {
      console.log(error.message);
    }
  }

  fetchData(orariStudent1, deget1, orariPedagog1, pedagoget1) {
    const { navigation } = this.props;
    if (this.state.student && orariStudent1 === null && deget1 === null) {
      console.log('calledS');
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
          })
        )
        .catch(error => {
          console.log(error);
        });
    } else if (!this.state.student && orariPedagog1 === null && pedagoget1 === null) {
      console.log('calledP');
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
              this.setState({ orariPedagog: orariPedagog.pedagoget, loading: false }, () => {
                navigation.navigate('LaunchScreen', {
                  student: this.state.student,
                  orari: this.state.student ? this.state.orariStudent : this.state.orariPedagog,
                  deget: this.state.student ? this.state.deget : null,
                  pedagoget: !this.state.student ? this.state.pedagoget : null
                });
              });
            });
          })
        )
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('called');
      // console.log(orariPedagog1.pedagog);
      //console.log(pedagoget1);
      // console.log(orariStudent1);
      this.setState(
        {
          orariStudent: orariStudent1,
          orariPedagog: orariPedagog1.pedagog,
          deget: deget1,
          loading: false,
          pedagoget: pedagoget1
        },
        () => {
          navigation.navigate('LaunchScreen', {
            student: this.state.student,
            orari: this.state.student ? this.state.orariStudent : this.state.orariPedagog,
            deget: this.state.student ? this.state.deget : null,
            pedagoget: !this.state.student ? this.state.pedagoget : null
          });
        }
      );
    }
  }
  animate(open) {
    Animated.timing(this.textAnim, {
      toValue: open ? 1 : 0,
      useNativeDriver: true,
      duration: 400
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

    return (
      <View style={styles.mainContainer}>
        <StatusBar trasparent />
        <LinearGradient colors={['#141E30', '#243B55']} style={styles.background} />
        <View style={styles.centered}>
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
        <Spinner
          style={{
            position: 'absolute',
            left: Metrics.screenWidth * 0.45,
            top: Metrics.screenHeight * 0.75
          }}
          isVisible={this.state.loading}
          size={60}
          type="ThreeBounce"
          color="white"
        />
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            this.setState({ loading: true }, () => {
              if (!this.state.student) {
                this.retrieveItem('orariPedagog', 'pedagoget').then(pedagogetOrari => {
                  if (pedagogetOrari !== null) {
                    this.fetchData([], [], pedagogetOrari.val1, pedagogetOrari.val2);
                  } else {
                    this.fetchData([], [], null, null);
                  }
                });
              } else {
                this.retrieveItem('orariStudent', 'deget').then(degetOrari => {
                  if (degetOrari !== null) {
                    this.fetchData(degetOrari.val1, degetOrari.val2, [], []);
                  } else {
                    this.fetchData(null, null, [], []);
                  }
                });
              }
            });
          }}
        >
          <Icon name="navigate-next" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ChoiceScreen;
