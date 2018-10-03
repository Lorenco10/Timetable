import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, StatusBar, Animated, Alert } from 'react-native';
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

    // const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
  }

  fetchData() {
    const { navigation } = this.props;
    //NativeModules.NavigationBarAndroid.hide();
    if (this.state.student) {
      axios
        .all([
          axios.get('http://37.139.119.36:81/orari/getXMLFile/xmlDeget'),
          axios.get('http://37.139.119.36:81/orari/getXMLFile/xmlStudentet')
        ])
        .then(
          axios.spread((deget, orariS) => {
            parseString(deget.data, (err, degetList) => {
              this.setState({ deget: degetList.deget.slot });
            });
            parseString(orariS.data, (err, orariStudent) => {
              this.setState({ orariStudent: orariStudent.orari.slot, loading: false }, () => {
                console.log(this.state.deget[0].dega[0]);
                console.log(this.state.orariStudent);
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
    } else {
      axios
        .all([
          axios.get('http://37.139.119.36:81/orari/getXMLFile/xmlPedagoget'),
          axios.get('http://37.139.119.36:81/orari/getXMLFile/xmlPedagog')
        ])
        .then(
          axios.spread((orariP, pedagoget) => {
            parseString(pedagoget.data, (err, pedagogetList) => {
              this.setState({ pedagoget: pedagogetList.pedagoget.slot });
              console.log(pedagogetList.pedagoget.slot[0].pedagog[0]);
            });
            parseString(orariP.data, (err, orariPedagog) => {
              this.setState({ orariPedagog: orariPedagog.pedagoget, loading: false }, () => {
                navigation.navigate('LaunchScreen', {
                  student: this.state.student,
                  orari: this.state.student ? this.state.orariStudent : this.state.orariPedagog,
                  deget: this.state.student ? this.state.deget : null,
                  pedagoget: !this.state.student ? this.state.pedagoget : null
                });
              });
              console.log(orariPedagog.pedagoget);
            });
          })
        )
        .catch(error => {
          console.log(error);
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
              this.fetchData();
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
