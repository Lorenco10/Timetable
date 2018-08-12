import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, StatusBar, Animated } from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
//import Spinner from 'react-native-spinkit';
import { parseString } from 'react-native-xml2js';
import { Images } from '../Themes';

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

    // const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
  }

  fetchData() {
    //NativeModules.NavigationBarAndroid.hide();
    if (_.isEmpty(this.state.deget)) {
      axios
        .get('http://37.139.119.36:81/orari/getXMLFile/xmlDeget')
        .then(response => {
          parseString(response.data, (err, result) => {
            this.setState({ deget: result.deget.slot });
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (_.isEmpty(this.state.orariStudent && this.state.student)) {
      axios
        .get('http://37.139.119.36:81/orari/getXMLFile/xmlStudentet')
        .then(response => {
          parseString(response.data, (err, result) => {
            this.setState({ orariStudent: result.orari.slot });
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (_.isEmpty(this.state.orariPedagog && !this.state.student)) {
      axios
        .get('http://37.139.119.36:81/orari/getXMLFile/xmlPedagog')
        .then(response => {
          parseString(response.data, (err, result) => {
            this.setState({ orariPedagog: result.orari.slot });
          });
        })
        .catch(error => {
          console.log(error);
        });

      axios
        .get('http://37.139.119.36:81/orari/getXMLFile/xmlPedagoget')
        .then(response => {
          parseString(response.data, (err, result) => {
            this.setState({ orariPedagog: result.orari.slot });
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  animate(open) {
    Animated.timing(this.textAnim, {
      toValue: open ? 1 : 0,
      useNativeDriver: true
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

    const { navigation } = this.props;

    return (
      <View style={styles.mainContainer}>
        <StatusBar trasparent />
        <LinearGradient colors={['#141E30', '#243B55']} style={styles.background} />
        <View style={styles.centered}>
          <Image source={Images.launch1} style={styles.logo} />
          <TouchableOpacity
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
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            this.fetchData();
            if (!this.state.loading) {
              navigation.navigate('LaunchScreen', {
                student: this.state.student,
                orari: this.state.student ? this.state.orariStudent : this.state.orariPedagog,
                deget: this.state.student ? this.state.deget : null,
                pedagoget: this.state.student ? this.state.pedagoget : null
              });
            }
          }}
        >
          <Icon name="navigate-next" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ChoiceScreen;
