import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  //FlatList,
  ScrollView,
  /*NativeModules*/
  Animated
} from 'react-native';
//import axios from 'axios';
//import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import Spinner from 'react-native-spinkit';
//import { parseString } from 'react-native-xml2js';
import { Images } from '../Themes';

// Styles
import styles from './Styles/LaunchScreenStyles';

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deget: props.navigation.getParam('deget'),
      pedagoget: props.navigation.getParam('pedagoget'),
      student: props.navigation.getParam('student'),
      orari: props.navigation.getParam('orari'),
      modalVisible: false,
      activePicker: '',
      pedagogu: 'PEDAGOGU',
      dega: 'DEGA',
      viti: 'VITI',
      paraleli: 'PARALELI'
    };

    this.modalAnim = new Animated.Value(0.01);

    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.show = this.show.bind(this);
    this.animate = this.animate.bind(this);
  }

  animate(open) {
    Animated.spring(this.modalAnim, {
      toValue: open ? 1 : 0,
      useNativeDriver: true,
      velocity: 15,
      tension: 20,
      friction: 50
    }).start();
  }

  show(picker) {
    if (picker === 'viti') {
      const initialArr = [{ id: 1, text: '1' }, { id: 2, text: '2' }, { id: 3, text: '3' }];
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {initialArr.map(prop => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    this.setState({ modalVisible: !this.state.modalVisible, viti: prop.text });
                  }, 100);
                  this.animate(!this.state.modalVisible);
                }}
                style={styles.vitiParaleliContainer}
                key={prop.id}
              >
                <Text style={styles.vitiParaleliText}>{prop.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    if (picker === 'paraleli') {
      const initialArr = [
        { id: 1, text: 'A1' },
        { id: 2, text: 'A2' },
        { id: 3, text: 'B1' },
        { id: 4, text: 'B2' },
        { id: 5, text: 'C1' },
        { id: 6, text: 'C2' }
      ];
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop: '50%'
          }}
        >
          {initialArr.map(prop => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                      paraleli: prop.text
                    });
                  }, 100);
                  this.animate(!this.state.modalVisible);
                }}
                style={styles.vitiParaleliContainer}
                key={prop.id}
              >
                <Text style={styles.vitiParaleliText}>{prop.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    if (picker === 'dega') {
      return (
        <ScrollView
          style={{
            flex: 1
          }}
        >
          {/* <ScrollView
            style={{
              flex: 1
            }}
          >
            {this.state.deget.map(prop => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setTimeout(() => {
                      this.setState({ modalVisible: !this.state.modalVisible, dega: prop.dega[0] });
                    }, 100);
                    this.animate(!this.state.modalVisible);
                  }}
                  style={{ flex: 1 }}
                  key={prop.dega}
                >
                  <Text style={styles.degetText}>{prop.dega}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView> */}
        </ScrollView>
      );
    }
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      />
      /*<FlatList
        data={this.state.deget}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        initialNumToRender={30}
      />*/
    );
  }

  keyExtractor(item, index) {
    return index.toString();
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ dega: item.dega });
          this.closeAnim();
        }}
        style={{ flex: 1, flexDirection: 'row', marginTop: index === 0 ? 15 : null }}
      >
        <Text style={styles.degetText}>{item.dega}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const scaleModal = this.modalAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const fadeModal = this.modalAnim.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const { navigation } = this.props;

    return (
      <View style={styles.mainContainer}>
        <StatusBar trasparent />
        <LinearGradient colors={['#141E30', '#243B55']} style={styles.backgroundTheme} />
        <View style={styles.centered}>
          <Image source={Images.launch} style={styles.logo} />
          {this.state.student ? (
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                    activePicker: 'dega'
                  });
                  this.animate(!this.state.modalVisible);
                }}
              >
                <Text style={styles.pickerText}>{this.state.dega}</Text>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible, activePicker: 'viti' });
                  this.animate(!this.state.modalVisible);
                }}
              >
                <Text style={styles.pickerText}>{this.state.viti}</Text>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                    activePicker: 'paraleli'
                  });
                  this.animate(!this.state.modalVisible);
                }}
              >
                <Text style={styles.pickerText}>{this.state.paraleli}</Text>
                <View style={styles.line} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                    activePicker: 'pedagogu'
                  });
                  this.animate(!this.state.modalVisible);
                }}
              >
                <Text style={styles.pickerText}>{this.state.pedagogu}</Text>
                <View style={styles.line} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate('MainScreen', {
              orari: this.state.orari,
              dega: this.state.dega,
              viti: this.state.viti,
              paraleli: this.state.paraleli
            });
          }}
        >
          <Icon name="navigate-next" size={30} color="white" />
        </TouchableOpacity>
        {this.state.modalVisible ? (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              elevation: 20,
              opacity: fadeModal,
              //transform: [{ scale: fadeModal }],
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={[styles.backgroundTheme, { backgroundColor: 'black', opacity: 0.5 }]}
              onPress={() => {
                setTimeout(() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }, 100);
                this.animate();
              }}
              activeOpacity={0.5}
            />
            <Animated.View style={[styles.modal, { transform: [{ scale: scaleModal }] }]}>
              {this.show(this.state.activePicker)}
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>ZGJIDHNI</Text>
              </View>
            </Animated.View>
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

export default LaunchScreen;
